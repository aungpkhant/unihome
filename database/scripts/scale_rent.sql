-- Normalize rent dataset over the range of 0 to 100 in order of most expensive to cheapest

UPDATE "RENT" 
SET rent_score = 100 - (rent_price - ( SELECT min(rent_price) FROM "RENT")) / (
(SELECT max(rent_price) FROM "RENT") - (SELECT min(rent_price) FROM "RENT")
) * 100