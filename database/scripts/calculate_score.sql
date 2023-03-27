-- STORED FUNCTION
CREATE OR REPLACE FUNCTION get_suburb_scores(
   user_rent_weight int,
   user_crime_weight int, 
   user_distance_weight int,
   user_uni_code varchar
) RETURNS TABLE(
    suburb_postcode numeric,
    suburb_name varchar,
    suburb_state char,
    suburb_lat numeric,
    suburb_long numeric,
    rent_price numeric,
    rent_date date,
    rent_score numeric,
    crime_year numeric,
    crime_score_original numeric,
    crime_count numeric,
    distance_score numeric,
    distance_in_km real,
    bus_count numeric,
    train_count numeric,
    tram_count numeric,
    crime_score numeric,
    scaled_rent_score numeric,
    scaled_crime_score numeric,
    scaled_distance_score numeric,
    scaled_overall_score numeric
)
LANGUAGE plpgsql    
AS $$
    DECLARE
        sum_user_weights  integer := 0;
    BEGIN
        
        sum_user_weights := user_rent_weight + user_crime_weight + user_distance_weight;
        RAISE NOTICE '%', sum_user_weights;
        
        RETURN QUERY (
            -- Actual query
            SELECT *,
            ROUND((100 - temptable.crime_score_original/3132.70 * 100), 2) AS crime_score,
            temptable.rent_score * user_rent_weight as scaled_rent_score,
            ROUND((100 - temptable.crime_score_original/3132.70 * 100), 2) * user_crime_weight as scaled_crime_score,
            temptable.distance_score * user_distance_weight as scaled_distance_score,

            -- scaled overall score calculation
           ROUND( ((temptable.rent_score * user_rent_weight + 
                    temptable.distance_score * user_distance_weight + 
                    ROUND((100 - temptable.crime_score_original/3132.70 * 100), 2) * user_crime_weight) / sum_user_weights) , 2)
            
            as scaled_overall_score
            FROM (
                
                WITH cte_crime AS (
                SELECT cr.suburb_name,
                cr.suburb_postcode, cr.year,
                SUM(cr.crime_incidents * crime_weight) AS crime_score_original,
                SUM(cr.crime_incidents) AS crime_count
                FROM "CRIME" cr JOIN "OFFENCE_DIVISION" od
                ON cr.offence_code = od.crime_code 
                GROUP BY cr.suburb_name, cr.suburb_postcode, cr.year
                ),
                
                cte_rent_suburb AS (
                SELECT su.*, re.rent_price, re.rent_date, re.rent_score FROM "RENT" re JOIN "SUBURB" su ON re.suburb_name = su.suburb_name
                ORDER BY re.suburb_name
                ), 
                
                cte_distance AS (
                    SELECT ds.suburb_postcode, ds.suburb_name, ds.distance_in_km, ds.distance_score FROM "DISTANCE_SUBURB_UNI" ds WHERE ds.uni_code = user_uni_code AND ds.distance_in_km IS NOT NULL
                ),
                
                cte_public_transport AS (
                    SELECT stop_suburb as "suburb_name",
                    SUM (CASE stop_type WHEN 'B' THEN stop_count ELSE 0 END) AS bus_count,
                    SUM (CASE stop_type WHEN 'TR' THEN stop_count ELSE 0 END) AS tram_count,
                    SUM (CASE stop_type WHEN 'T' THEN stop_count ELSE 0 END) AS train_count
                    FROM (
                    SELECT stop_suburb, stop_type, COUNT(*) AS stop_count
                    FROM "STOPS" GROUP BY stop_suburb, stop_type 
                    ) _ GROUP BY stop_suburb 
                )
                
                SELECT
                cte_rent_suburb.*,
                cte_crime.year as crime_year,
                cte_crime.crime_score_original,
                cte_crime.crime_count,
                cte_distance.distance_score,
                cte_distance.distance_in_km,
                cte_public_transport.bus_count,
                cte_public_transport.train_count,
                cte_public_transport.tram_count
                FROM 
                cte_crime JOIN cte_rent_suburb ON cte_crime.suburb_name = cte_rent_suburb.suburb_name
                AND cte_crime.suburb_postcode = cte_rent_suburb.suburb_postcode 
                JOIN cte_distance ON cte_distance.suburb_postcode = cte_crime.suburb_postcode AND
                cte_distance.suburb_name = cte_crime.suburb_name 
                JOIN cte_public_transport ON cte_public_transport.suburb_name = cte_crime.suburb_name 
            ) temptable ORDER BY crime_score_original DESC
        );
    END;
$$;

-- INVOKING THE STORED FUNCTION
SELECT * FROM get_suburb_scores(0,0,4, 'MON002') ORDER BY scaled_overall_score DESC;

-- DROPPING THE STORED FUNCTION
DROP FUNCTION get_suburb_scores (integer,integer,integer, varchar);