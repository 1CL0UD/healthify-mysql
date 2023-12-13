import express from 'express';
import { pool } from '../database.js';
import bcrypt from 'bcrypt';

const router = express.Router();
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Received Request Body:', req.body);

  try {
    const connection = await pool.getConnection();

    // Check if the username already exists in the database
    const [existingUsers] = await connection.query(
      'SELECT * FROM user WHERE username = ?',
      [username]
    );

    // Check if the email is already used by another user
    const [existingUserEmail] = await connection.query(
      'SELECT * FROM user WHERE email = ?',
      [email]
    );

    connection.release();

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    if (existingUserEmail.length > 0) {
      return res
        .status(400)
        .json({ error: 'Email already used by another user' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user with the hashed password
    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    const insertUserQuery = 'INSERT INTO user SET ?';

    const userConnection = await pool.getConnection();
    await userConnection.query(insertUserQuery, newUser);
    userConnection.release();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
export default router;
