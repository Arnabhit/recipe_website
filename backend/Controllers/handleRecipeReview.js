const Recipe = require('../Models/Recipe');

// Controller to handle adding a review to a recipe
const handleRecipeReview = async (req, res) => {
    try {
        const { recipeId, category, rating, comment } = req.body; // Expecting recipeId, category, rating, and comment in the request body

        // Find the recipe by ID using the actual recipeId variable
        //console.log("recipeId backend", recipeId);
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        // Create a new review object
        const newReview = {
            category,
            rating,
            comment,
            createdAt: new Date(),
        };

        // Add the review to the recipe's reviews array
        recipe.ratings.push(newReview);

        // Update the average rating of the recipe
        let sum = 0;
        let validRatings = recipe.ratings.filter(i => i && i.rating !== undefined);
        
        validRatings.forEach(i => {
            sum += i.rating;
        });
        
        recipe.averageRating = sum / recipe.ratings.length;

        // Save the updated recipe document
        await recipe.save();

        res.status(200).json({ message: 'Review added successfully', recipe });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
};

module.exports = { handleRecipeReview };
