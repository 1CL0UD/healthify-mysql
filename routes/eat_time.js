import express from 'express';
import { getEat_time, getEat_timeById, addEat_time } from '../handlers/eat_time.js';

const router = express.Router();
router.get('/', async (req, res) => {
  const eat_time = await getEat_time();
  res.send(eat_time);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const notes = await getEat_timeById(id);
  res.status(201).send(notes);
});

router.post('/', async (req, res) => {
  const { diary_id, food_id, eat_time, food_name } = req.body;
  const notes = await addEat_time(diary_id, food_id, eat_time, food_name);
  res.send(notes);
});

export default router;
