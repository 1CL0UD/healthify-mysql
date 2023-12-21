import express from 'express';
import {
  getFoods,
  getFoodById,
  addFood,
  addToDiary,
} from '../handlers/foods.js';

const router = express.Router();
router.get('/', async (req, res) => {
  const foods = await getFoods();
  res.send(foods);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const foods = await getFoodById(id);
  res.status(201).send(foods);
});

router.post('/', async (req, res) => {
  const { user_id, food_name, calories, protein, carbohydrate, fat } = req.body;
  const foods = await addFood(
    user_id,
    food_name,
    calories,
    protein,
    carbohydrate,
    fat
  );
  res.send(foods);
});

router.post('/addToDiary', async (req, res) => {
  const { diary_id, food_id, eat_time } = req.body;
  console.log('adding to diary');
  const foods = await addToDiary(diary_id, food_id, eat_time);
  res.send(foods);
});

export default router;
