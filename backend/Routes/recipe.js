const express = require('express');
const router = express.Router();
const { storage, upload } = require('../Middleware/uploadimage'); 
const { handleRecipe } = require('../Controllers/recipe');
const {authMiddleware} = require('../Middleware/authMiddleware'); // Import the middleware

// Apply the middleware to protect the route
router.post('/post-recipe', authMiddleware,upload.single('image'), handleRecipe);

module.exports = router;
