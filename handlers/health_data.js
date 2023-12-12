import { pool } from '../database.js';

export async function getHealth_data() {
  const [rows] = await pool.query('SELECT * FROM health_data');
  return rows;
}

export async function getHealth_dataById(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM health_data
  WHERE health_data_id = ?
  `,
    [id]
  );
  return rows;
}

export async function addHealth_data(
  user_id,
  energy_char,
  weight,
  height,
  steps,
  heart_rate
) {
  const [result] = await pool.query(
    `
  INSERT INTO user (user_id, energy_char, weight, height, steps, heart_rate) 
  VALUES (?, ?, ?, ?, ?)
  `,
    [user_id, energy_char, weight, height, steps, heart_rate]
  );
  const id = result.insertId;
  return getHealth_dataById(id);
}
