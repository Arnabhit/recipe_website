const Recipe = require('../Models/Recipe'); 
const Review = require('../Models/Review'); 

const retrieveRecipeById = async (req, res) => {
    const { id } = req.params; 
   

    try {
        
        const recipe = await Recipe.findById(id);

        
        
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        
        const reviews = await Review.find({ recipeId: id });

        
        res.json({ recipe, reviews });
    } catch (error) {
        console.error('Error retrieving recipe:', error);
        res.status(500).json({ error: 'Failed to retrieve recipe' });
    }
};

module.exports = { retrieveRecipeById };
