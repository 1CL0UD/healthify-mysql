import express from 'express';
import userRoutes from './routes/user.js';
import diaryRoutes from './routes/diary.js';
import eatTimeRoutes from './routes/eat_time.js';
import foodRoutes from './routes/foods.js';
import healthDataRoutes from './routes/health_data.js';

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/user', userRoutes);

app.use('/diary', diaryRoutes);

app.use('/eat-time', eatTimeRoutes);

app.use('/food', foodRoutes);

app.use('/health-data', healthDataRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(8080, () => {
  console.log('Server is running');
});
