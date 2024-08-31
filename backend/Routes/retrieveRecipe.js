// routes/business.js
const express = require('express');
const { handleRecipeRetrieve} = require('../Controllers/recipeRetrieve');

const router = express.Router();

router.get('/retrieve', handleRecipeRetrieve);

module.exports = router;
