import { pool } from '../database.js';

export async function getDiary() {
  try {
    const [rows] = await pool.query('SELECT * FROM diary');
    return {
      error: false,
      message: 'Diary fetched successfully',
      diaryList: rows,
    };
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching diary',
      diaryList: [],
    };
  }
}

export async function getDiaryById(id) {
  try {
    const [rows] = await pool.query(
      `
      SELECT * 
      FROM diary
      WHERE diary_id = ?
      `,
      [id]
    );
    if (rows.length === 0) {
      return {
        error: true,
        message: 'Diary not found',
        diaryDetails: null,
      };
    }
    return {
      error: false,
      message: 'Diary details fetched successfully',
      diaryDetails: rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching diary details',
      diaryDetails: null,
    };
  }
}

export async function getDiaryByIdWithName(id) {
  try {
    const [rows] = await pool.query(
      `
      SELECT eat.*, foods.food_name
      FROM eat_time AS eat
      JOIN foods ON eat.food_id = foods.food_id
      WHERE eat.diary_id = ?; 
      `,
      [id]
    );

    return {
      error: false,
      message: 'Diary with food names fetched successfully',
      diaryDetailsWithFood: rows,
    };
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching diary details with food names',
      diaryDetailsWithFood: [],
    };
  }
}

export async function addDiary(diary_id, user_id, diary_date, calorie_target) {
  try {
    const [result] = await pool.query(
      `
      INSERT INTO diary (diary_id, user_id, diary_date, calorie_target) 
      VALUES (?, ?, ?, ?)
      `,
      [diary_id, user_id, diary_date, calorie_target]
    );
    const id = result.insertId;
    return getDiaryById(id);
  } catch (error) {
    return {
      error: true,
      message: 'Error adding diary',
      diaryDetails: null,
    };
  }
}
