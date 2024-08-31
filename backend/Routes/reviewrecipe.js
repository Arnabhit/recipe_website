const express=require('express');
const router=express.Router();
const { handleRecipeReview} = require('../Controllers/handleRecipeReview');


router.post('/recipe', handleRecipeReview);

module.exports = router;
