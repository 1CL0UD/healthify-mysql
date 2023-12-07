import { pool } from '../database.js';

export async function getFoods() {
  const [rows] = await pool.query('SELECT * FROM food');
  return rows;
}

export async function getFoodById(id) {
  const [rows] = await pool.query(
    `
  SELECT * 
  FROM food
  WHERE ID = ?
  `,
    [id]
  );
  return rows[0];
}

export async function addFood(user_id, food_name, energy, protein, carbohydrate) {
  const [result] = await pool.query(
    `
  INSERT INTO user (user_id, food_name, energy, protein, carbohydrate) 
  VALUES (?, ?, ?, ?, ?)
  `,
    [user_id, food_name, energy, protein, carbohydrate]
  );
  const id = result.insertId;
  return getFoodsById(id);
}
