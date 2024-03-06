-- ////
-- avg_kms_and_paid
SELECT
  v.id,
  v.user_id,
  v.brand,
  v.nameplate,
  v.color,
  COALESCE(ROUND(AVG(CASE WHEN t.row_num > 1 THEN t.last_km - t.prev_km END), 2), 0) AS media_tank,
  COALESCE(ROUND(AVG(CASE WHEN t.row_num > 1 THEN t.paid END), 2), 0) AS media_paid,
  t.last_km
FROM (
  SELECT
    vehicle_id,
    km AS last_km,
    LAG(km) OVER (PARTITION BY vehicle_id ORDER BY created DESC) AS prev_km,
    paid,
    ROW_NUMBER() OVER (PARTITION BY vehicle_id ORDER BY created) AS row_num
  FROM kms
) AS t
JOIN vehicles AS v ON t.vehicle_id = v.id
GROUP BY v.id;
-- ////
