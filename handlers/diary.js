import { pool } from '../database.js';

export async function getDiary() {
  const [rows] = await pool.query('SELECT * FROM diary');
  return rows;
}

export async function getDiaryById(id) {
  const [rows] = await pool.query(
    `
    SELECT * 
    FROM diary
    WHERE ID = ?
    `,
    [id]
  );
  return rows[0];
}

export async function addDiary(diary_id, user_id, diary_date, calorie_target) {
  const [result] = await pool.query(
    `
    INSERT INTO diary (diary_id, user_id, diary_date, calorie_target) 
    VALUES (?, ?, ?, ?, ?)
    `,
    [diary_id, user_id, diary_date, calorie_target]
  );
  const id = result.insertId;
  return getDiaryById(id);
}
