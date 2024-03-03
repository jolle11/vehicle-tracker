-- ////
-- avg_kms_and_paid
SELECT
  v.id,
  v.user_id,
  v.brand,
  v.nameplate,
  v.color,
  COALESCE(ROUND(AVG(t.last_km - t.prev_km), 2), 0) AS media_tank,
  ROUND(AVG(t.paid), 2) AS media_paid,
  t.last_km
FROM (
  SELECT
    vehicle_id,
    km AS last_km,
    LAG(km) OVER (PARTITION BY vehicle_id ORDER BY created DESC) AS prev_km,
    paid
  FROM kms
) AS t
JOIN vehicles AS v ON t.vehicle_id = v.id
GROUP BY v.id;
-- ////
