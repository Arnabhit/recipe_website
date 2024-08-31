const Recipe = require('../Models/Recipe');


const handleRecipeReview = async (req, res) => {
    try {
        const { recipeId, category, rating, comment } = req.body; 

     ;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

       
        const newReview = {
            category,
            rating,
            comment,
            createdAt: new Date(),
        };

        recipe.ratings.push(newReview);

        let sum = 0;
        let validRatings = recipe.ratings.filter(i => i && i.rating !== undefined);
        
        validRatings.forEach(i => {
            sum += i.rating;
        });
        
        recipe.averageRating = sum / recipe.ratings.length;


        await recipe.save();

        res.status(200).json({ message: 'Review added successfully', recipe });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
};

module.exports = { handleRecipeReview };
