import express from 'express';
import userRoutes from './routes/user.js';
import diaryRoutes from './routes/diary.js';
import eatTimeRoutes from './routes/eat_time.js';
import foodRoutes from './routes/foods.js';
import healthDataRoutes from './routes/health_data.js';
import registerRoutes from './routes/register.js';
import loginRoutes from './routes/login.js';
import { authenticateUser } from './middleware/auth.js';
import { verifyToken } from './middleware/verifyToken.js';
import jwt from 'jsonwebtoken';

import setCors from './middleware/corsMiddleware.js'; // Import the CORS middleware

const app = express();
app.use(express.json());

app.use(setCors);

app.get('/', async (req, res) => {
  const username = 'username';
  const password = 'password';
  const user = await authenticateUser(username, password);
  if (user) {
    res.status(201).json({
      error: false,
      message: 'Hello World',
    });
  } else {
    res.status(401).send('Not hello world'); // Return 'Not hello world' if login fails
  }
});

// Use the login routes
app.use('/login', loginRoutes);

app.use('/register', registerRoutes);

// Routes to retrieve data from MySQL Database
app.use('/user', verifyToken, userRoutes);
app.use('/diary', verifyToken, diaryRoutes);
app.use('/eat-time', verifyToken, eatTimeRoutes);
app.use('/food', verifyToken, foodRoutes);
app.use('/health-data', verifyToken, healthDataRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

const port = 8080;
app.listen(port, () => {
  console.log('Server is running http://localhost:' + port);
});
