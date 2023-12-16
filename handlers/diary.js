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
    WHERE diary_id = ?
    `,
    [id]
  );
  return rows;
}

export async function getDiaryByIdWithName(id) {
  const [rows] = await pool.query(
    `
  SELECT eat.*, foods.food_name
  FROM eat_time AS eat
  JOIN foods ON eat.food_id = foods.food_id
  WHERE eat.diary_id = ?; 
  `,
    [id]
  );

  return rows;
}

export async function addDiary(user_id, diary_date, calorie_target) {
  const [result] = await pool.query(
    `
    INSERT INTO diary (user_id, diary_date, calorie_target) 
    VALUES (?, ?, ?)
    `,
    [user_id, diary_date, calorie_target]
  );
  const id = result.insertId;
  return getDiaryById(id);
}
