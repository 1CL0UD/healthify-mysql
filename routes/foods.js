import express from 'express';
import { getFoods, getFoodById, addFood } from '../handlers/foods.js';

const router = express.Router();
router.get('/', async (req, res) => {
  const foods = await getFoods();
  res.send(foods);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const notes = await getFoodById(id);
  res.status(201).send(notes);
});

router.post('/', async (req, res) => {
  const { user_id, food_name, energy, protein, carbohydrate, fat } = req.body;
  const notes = await addFood(
    user_id,
    food_name,
    energy,
    protein,
    carbohydrate,
    fat
  );
  res.send(notes);
});

export default router;
