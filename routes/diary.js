import express from 'express';
import { getDiary, getDiaryById, addDiary } from '../handlers/diary.js';

const router = express.Router();
router.get('/', async (req, res) => {
  const diary = await getDiary();
  res.send(diary);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const notes = await getDiaryById(id);
  res.status(201).send(notes);
});

router.post('/', async (req, res) => {
  const { diary_id, user_id, diary_date, calorie_target } = req.body;
  const notes = await addDiary(diary_id, user_id, diary_date, calorie_target);
  res.send(notes);
});

export default router;
