const Recipe = require('../Models/Recipe'); // Import the Recipe model
const Review = require('../Models/Review'); // Import the Review model (if reviews are stored in a separate collection)

const retrieveRecipeById = async (req, res) => {
    const { id } = req.params; // Extract the recipe ID from the request parameters
    console.log("id",id);

    try {
        // Fetch the recipe by its ID
        const recipe = await Recipe.findById(id);

        // Check if the recipe exists
        console.log("recipe",recipe.image);
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        // Fetch reviews related to the recipe, if needed
        const reviews = await Review.find({ recipeId: id });

        // Respond with the recipe and its reviews
        res.json({ recipe, reviews });
    } catch (error) {
        console.error('Error retrieving recipe:', error);
        res.status(500).json({ error: 'Failed to retrieve recipe' });
    }
};

module.exports = { retrieveRecipeById };
