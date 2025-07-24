const Recipes = require('../models/recipe');
const getRecipes = async(req, res) => {
    const recipes = await Recipes.find();
  return  res.json(recipes);
}  
const getRecipe = async(req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.findById(id);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  return res.json(recipe);
}

const addRecipe = async(req, res) => {
  const {title, time, ingredients, instructions} = req.body;

if(!title || !ingredients || !instructions) {
    return res.status(400).json({ message: 'All fields are required' });
  } 
  const newRecipe = await Recipes.create({
    title,
    time,
    ingredients,
    instructions
  });

  return res.status(201).json({
    message: 'Recipe added successfully',
    recipe: newRecipe
  });
}

const editRecipe = (req, res) => {
  const { id } = req.params;
  const { title, time, ingredients, instructions } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  Recipes.findByIdAndUpdate(id, {
    title,
    time,
    ingredients,
    instructions
  }, { new: true })
  .then(updatedRecipe => {
    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    return res.json({
      message: 'Recipe updated successfully',
      recipe: updatedRecipe
    });
  })
  .catch(err => {
    return res.status(500).json({ message: 'Error updating recipe', error: err.message });
  });
}

const deleteRecipe = async(req, res) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await Recipes.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    return res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Error deleting recipe', error: err.message });
  }
}

module.exports = {
  getRecipes,getRecipe,
  addRecipe, editRecipe, deleteRecipe
}