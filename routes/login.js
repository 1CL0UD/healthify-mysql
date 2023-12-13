// loginRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticateUser } from '../middleware/auth.js';

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await authenticateUser(username, password);

  if (user) {
    const token = jwt.sign({ username: user.username }, 'your_secret_key', {
      expiresIn: '1h',
    });
    const loggedIn = {
      error: false,
      message: 'success',
      loginResult: {
        userId: user.id,
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
