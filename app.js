import express from 'express';
import { getUsers, getUserById, addUser } from './database.js';

const app = express();

app.use(express.json());

app.get('/user', async (req, res) => {
  const users = await getUsers();
  res.send(notes);
});

app.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  const notes = await getUserById(id);
  res.status(201).send(notes);
});

app.post('/user', async (req, res) => {
  const { user_id, google_id, username, email, password } = req.body;
  const notes = await addUser(user_id, google_id, username, email, password);
  res.send(notes);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(8080, () => {
  console.log('Server is running');
});
