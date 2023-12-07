import express from 'express';
import { getUsers, getUserById, addUser } from './handlers/user.js';

const app = express();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(8080, () => {
  console.log('Server is running');
});
