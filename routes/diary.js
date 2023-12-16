import express from 'express';
import {
  getDiary,
  getDiaryById,
  getDiaryByIdWithName,
  addDiary,
} from '../handlers/diary.js';

const router = express.Router();
router.get('/', async (req, res) => {
  const diary = await getDiary();
  res.send(diary);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const diary = await getDiaryById(id);
  res.status(201).send(diary);
});

router.get('/diaryId/:id', async (req, res) => {
  const id = req.params.id;
  const diary = await getDiaryByIdWithName(id);
  res.status(201).send(diary);
});

router.post('/', async (req, res) => {
  const { user_id, diary_date, calorie_target } = req.body;
  const diary = await addDiary(user_id, diary_date, calorie_target);
  res.send(diary);
});

export default router;
