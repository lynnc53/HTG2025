import express from 'express';
import connection from './db.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommend-clinics', (req, res) => {
  const { user_lat, user_lng, max_distance_km, symptoms } = req.body;

  const query = `
    SELECT *, (
      6371 * acos(
        cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
        sin(radians(?)) * sin(radians(latitude))
      )
    ) AS distance
    FROM clinics
    WHERE specialties LIKE CONCAT('%', ?, '%')
    HAVING distance <= ?
    ORDER BY wait_time_minutes ASC;
  `;

  connection.query(
    query,
    [user_lat, user_lng, user_lat, symptoms, max_distance_km],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'DB Error' });
      res.json(results);
    }
  );
});
app.get('/', (req, res) => {
    res.send(`
      <h2>This is the front end of our solution which is now successfully connected to a MySQL backend.</h2>
    `);
  });
  
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
