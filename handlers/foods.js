import { pool } from '../database.js';

export async function getFoods() {
  try {
    const [rows] = await pool.query('SELECT * FROM foods');
    return {
      error: false,
      message: 'Food fetched successfully',
      listFoods: [rows],
    };
  } catch (error) {
    // Handle errors if any occurred during the database query
    return {
      error: true,
      message: 'Error fetching food data',
      listFoods: [],
    };
  }
}

export async function getFoodById(id) {
  try {
    const [rows] = await pool.query(
      `
      SELECT * 
      FROM foods
      WHERE food_id = ?
      `,
      [id]
    );
    if (rows.length === 0) {
      return {
        error: true,
        message: 'Food not found',
        foodDetails: null,
      };
    }
    return {
      error: false,
      message: 'Food details fetched successfully',
      foodDetails: rows[0],
    };
  } catch (error) {
    return {
      error: true,
      message: 'Error fetching food details',
      foodDetails: null,
    };
  }
}

export async function addFood(
  user_id,
  food_name,
  energy,
  protein,
  carbohydrate,
  fat
) {
  try {
    const [result] = await pool.query(
      `
      INSERT INTO foods (user_id, food_name, calories, protein, carbohydrate, fat) 
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [user_id, food_name, energy, protein, carbohydrate, fat]
    );

    const id = result.insertId;
    return getFoodById(id);
  } catch (error) {
    return {
      error: true,
      message: 'Error adding food',
      foodDetails: null,
    };
  }
}
