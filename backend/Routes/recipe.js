const express = require('express');
const router = express.Router();
const { storage, upload } = require('../Middleware/uploadimage'); 
const { handleRecipe } = require('../Controllers/recipe');
const {authMiddleware} = require('../Middleware/authMiddleware'); 


router.post('/post-recipe', authMiddleware,upload.single('image'), handleRecipe);

module.exports = router;
