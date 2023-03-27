SELECT stop_suburb, stop_type, COUNT(*) FROM "STOPS" GROUP BY stop_suburb, stop_type
ORDER BY stop_suburb, stop_type
-- first column  : identifier of row (stop_suburb)
-- second column : row values from this col will be columns in the resulting table  (stop_type)
-- third column  : row values from this col will be row results in teh resulting table
SELECT * FROM CROSSTAB
('
 SELECT stop_suburb, stop_type, COUNT(*)
 FROM "STOPS" GROUP BY stop_suburb, stop_type 
 ORDER BY 1,2
 ')
 AS STOPS_PER_SUBURB
 (suburb_name TEXT, B NUMERIC, TR NUMERIC)
 
 -- Decided to use simple aggreagate instead
 -- Final func
SELECT stop_suburb as "suburb_name",
SUM (CASE stop_type WHEN 'B' THEN stop_count ELSE 0 END) AS bus_count,
SUM (CASE stop_type WHEN 'TR' THEN stop_count ELSE 0 END) AS train_count,
SUM (CASE stop_type WHEN 'T' THEN stop_count ELSE 0 END) AS tram_count
FROM (
SELECT stop_suburb, stop_type, COUNT(*) AS stop_count
FROM "STOPS" GROUP BY stop_suburb, stop_type 
) _ GROUP BY stop_suburb 
