import { pool } from '../database.js';

export async function getEat_time() {
  try {
    const [rows] = await pool.query('SELECT * FROM eat_time');
    return {
      error: false,
      message: 'Eat time fetched successfully',
      eatTimeList: rows,
    };
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching eat time',
      eatTimeList: [],
    };
  }
}

export async function getEat_timeById(id) {
  try {
    const [rows] = await pool.query(
      `
      SELECT * 
      FROM eat_time 
      WHERE eat_time_id = ?
      `,
      [id]
    );
    if (rows.length === 0) {
      return {
        error: true,
        message: 'Eat time not found',
        eatTimeDetails: null,
      };
    }
    return {
      error: false,
      message: 'Eat time details fetched successfully',
      eatTimeDetails: rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching eat time details',
      eatTimeDetails: null,
    };
  }
}

export async function addEat_time(diary_id, food_id, eat_time, food_name) {
  try {
    const [result] = await pool.query(
      `
      INSERT INTO eat_time (diary_id, food_id, eat_time, food_name) 
      VALUES (?, ?, ?, ?)
      `,
      [diary_id, food_id, eat_time, food_name]
    );
    const id = result.insertId;
    return getEat_timeById(id);
  } catch (error) {
    return {
      error: true,
      message: 'Error adding eat time',
      eatTimeDetails: null,
    };
  }
}
