const express=require('express');
const router=express.Router();
const { handleRecipeReview} = require('../Controllers/handleRecipeReview');



// Define the route for retrieving businesses
router.post('/recipe', handleRecipeReview);

module.exports = router;
