import bcrypt from 'bcrypt';
import { pool } from '../database.js';

async function authenticateUser(username, password) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT * FROM user WHERE username = ?',
      [username]
    );
    connection.release();

    if (rows.length > 0) {
      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      return passwordMatch ? user : null;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { authenticateUser };
