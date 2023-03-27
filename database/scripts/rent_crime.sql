WITH cte_crime AS (
SELECT cr.suburb_name,
cr.suburb_postcode, cr.year,
SUM(cr.crime_incidents * crime_weight) AS crime_score_original
FROM "CRIME" cr JOIN "OFFENCE_DIVISION" od
ON cr.offence_code = od.crime_code 
GROUP BY cr.suburb_name, cr.suburb_postcode, cr.year
), cte_rent_suburb AS (
SELECT su.*, re.rent_price, re.rent_date, re.rent_score FROM "RENT" re JOIN "SUBURB" su ON re.suburb_name = su.suburb_name
ORDER BY re.suburb_name
)
SELECT cte_rent_suburb.*, cte_crime.year as crime_year, cte_crime.crime_score_original FROM cte_crime JOIN cte_rent_suburb ON cte_crime.suburb_name = cte_rent_suburb.suburb_name AND cte_crime.suburb_postcode = cte_rent_suburb.suburb_postcode;
