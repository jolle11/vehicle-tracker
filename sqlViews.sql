-- ////
-- avg_kms_and_paid
SELECT
  v.id,
  v.user_id,
  v.brand,
  v.nameplate,
  v.color,
  ROUND(AVG(t.km_diff), 2) AS media_tank,
  ROUND(AVG(t.paid), 2) AS media_paid,
  t.last_km
FROM (
  SELECT
    vehicle_id,
    km AS last_km,
    (km - LAG(km) OVER (PARTITION BY vehicle_id ORDER BY id)) AS km_diff,
    paid
  FROM kms
) AS t
JOIN vehicles AS v ON t.vehicle_id = v.id
GROUP BY v.id;
-- ////
