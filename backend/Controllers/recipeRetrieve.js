const Recipe = require('../Models/Recipe'); 


const handleRecipeRetrieve = async (req, res) => {
  try {
    const { category } = req.query; 
    let query = {};

  
    if (category) {
      query.category = category;
    }

    const recipes = await Recipe.find(query); 
    res.json(recipes);
  } catch (error) {
    console.error('Error retrieving recipes:', error);
    res.status(500).json({ error: 'Failed to retrieve recipes' });
  }
};

module.exports = { handleRecipeRetrieve };
