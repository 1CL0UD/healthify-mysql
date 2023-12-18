// loginRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticateUser } from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await authenticateUser(username, password);

  if (user) {
    const token = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: '1h',
    });
    const loggedIn = {
      error: false,
      message: 'success',
      loginResult: {
        userId: user.user_id,
        name: user.username,
        token: token,
      },
    };
    res.status(201).json(loggedIn);
  } else {
    const notLoggedIn = {
      error: true,
      message: 'failed',
      loginResult: {},
    };
    res.status(401).json(notLoggedIn);
  }
});

export default loginRouter;
