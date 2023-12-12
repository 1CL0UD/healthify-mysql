import express from 'express';
import { getHealth_data, getHealth_dataById, addHealth_data } from '../handlers/health_data.js';

const router = express.Router();
router.get('/', async (req, res) => {
  const health_data = await getHealth_data();
  res.send(health_data);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const notes = await getHealth_dataById(id);
  res.status(201).send(notes);
});

router.post('/', async (req, res) => {
  const { user_id, energy_char, weight, height, steps, heart_rate } = req.body;
  const notes = await addUser(user_id, energy_char, weight, height, steps, heart_rate);
  res.send(notes);
});

export default router;
