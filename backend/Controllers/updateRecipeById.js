const Recipe = require('../Models/Recipe'); // Assuming you have a Recipe model

// Controller to update a recipe by ID
const updateRecipeById = async (req, res) => {
    const { id } = req.params; // Get recipe ID from URL parameters
    const updatedData = req.body; // Get the updated data from the request body

    try {
        // Find the recipe by ID and update it with new data
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated document
            runValidators: true, // Run schema validations on update
        });

        if (!updatedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        // Respond with the updated recipe
        res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {updateRecipeById};
