import { pool } from '../database.js';

export async function getEat_time() {
  const [rows] = await pool.query('SELECT * FROM eat_time');
  return rows;
}

export async function getEat_timeById(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM eat_time 
    WHERE eat_time_id = ?
    `,
    [id]
  );
  return rows;
}

export async function addEat_time(diary_id, food_id, eat_time, food_name) {
  const [result] = await pool.query(
    `
    INSERT INTO user (diary_id, food_id, eat_time, food_name) 
    VALUES (?, ?, ?, ?, ?)
    `,
    [diary_id, food_id, eat_time, food_name]
  );
  const id = result.insertId;
  return getEat_timeById(id);
}
