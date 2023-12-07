import express from 'express';
import { getUsers, getUserById, addUser } from '../handlers/user.js';

const router = express.Router();
router.get('/', async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const notes = await getUserById(id);
  res.status(201).send(notes);
});

router.post('/', async (req, res) => {
  const { user_id, google_id, username, email, password } = req.body;
  const notes = await addUser(user_id, google_id, username, email, password);
  res.send(notes);
});

export default router;
