const Recipe = require('../Models/Recipe'); 


const updateRecipeById = async (req, res) => {
    const { id } = req.params; 
    const updatedData = req.body; 

    try {
        
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, {
            new: true, 
            runValidators: true, 
        });

        if (!updatedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        
        res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
    } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {updateRecipeById};
