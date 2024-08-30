const express = require('express');
const Recipe = require('../Models/Recipe');

const handleRecipe = async (req, res) => {
    try {
        const { title, description, category, cookingTime, servings, tags,reviews,author } = req.body;
        let { ingredients, steps } = req.body;

        // Parse JSON strings if necessary
        if (typeof ingredients === 'string') {
            ingredients = JSON.parse(ingredients);
        }
        if (typeof steps === 'string') {
            steps = JSON.parse(steps);
        }

        // Handle image
        const image = req.file ? req.file.path : '';

        // Create a new recipe object
        const newRecipe = {
            title,
            description,
            ingredients,
            steps,
            image,
            category,
            cookingTime,
            servings,
            tags,
            reviews,
            author: req.user._id, // Assuming you're using authentication middleware to get the user
        };

        // Save the recipe to the database (assuming you have a Recipe model)
        const recipe = await Recipe.create(newRecipe);

        res.status(201).json(recipe);
    } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ message: 'Error creating recipe', error });
    }
};


module.exports = {
    handleRecipe,
};
