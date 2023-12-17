import { pool } from '../database.js';

export async function getHealth_data() {
  try {
    const [rows] = await pool.query('SELECT * FROM health_data');
    return {
      error: false,
      message: 'Health data fetched successfully',
      healthDataList: rows,
    };
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching health data',
      healthDataList: [],
    };
  }
}

export async function getHealth_dataById(id) {
  try {
    const [rows] = await pool.query(
      `
      SELECT * 
      FROM health_data
      WHERE health_data_id = ?
      `,
      [id]
    );
    if (rows.length === 0) {
      return {
        error: true,
        message: 'Health data not found',
        healthDataDetails: null,
      };
    }
    return {
      error: false,
      message: 'Health data details fetched successfully',
      healthDataDetails: rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching health data details',
      healthDataDetails: null,
    };
  }
}

export async function addHealth_data(
  user_id,
  energy_char,
  weight,
  height,
  steps,
  heart_rate
) {
  try {
    const [result] = await pool.query(
      `
      INSERT INTO health_data (user_id, energy_char, weight, height, steps, heart_rate) 
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [user_id, energy_char, weight, height, steps, heart_rate]
    );
    const id = result.insertId;
    return getHealth_dataById(id);
  } catch (error) {
    return {
      error: true,
      message: 'Error adding health data',
      healthDataDetails: null,
    };
  }
}
