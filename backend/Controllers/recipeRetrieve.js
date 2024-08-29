const Recipe = require('../Models/Recipe'); // Import the Recipe model

// Handler function to retrieve recipes
const handleRecipeRetrieve = async (req, res) => {
  try {
    const { category } = req.query; // Get the category from query parameters
    let query = {};

    // If a category is provided in the query, filter by that category
    if (category) {
      query.category = category;
    }

    const recipes = await Recipe.find(query); // Retrieve recipes based on the query
    res.json(recipes);
  } catch (error) {
    console.error('Error retrieving recipes:', error);
    res.status(500).json({ error: 'Failed to retrieve recipes' });
  }
};

module.exports = { handleRecipeRetrieve };
