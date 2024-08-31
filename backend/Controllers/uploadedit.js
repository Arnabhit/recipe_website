const express = require('express');
const multer = require('multer');
const path = require('path');
const Recipe = require('../Models/Recipe'); // Replace with your actual model

const uploadedit = () => {
  const app = express(); // Create an Express application
  const router = express.Router(); // Create a router

  // Set up multer storage
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directory to save the uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname); // Name of the file in the directory
    }
  });

  const upload = multer({ storage: storage });

  // Upload endpoint
  router.post('/upload', upload.single('image'), async (req, res) => {
    if (req.file) {
      const filePath = `/uploads/${req.file.filename}`;
      
      try {
        // Assuming you have a recipeId in the request body to identify the recipe
        const { recipeId } = req.body;

        // Update the database with the image path
        const updatedRecipe = await Recipe.findByIdAndUpdate(
          recipeId,
          { image: filePath },
          { new: true } // Returns the updated document
        );

        if (updatedRecipe) {
          res.json({ filePath, recipe: updatedRecipe });
        } else {
          res.status(404).json({ error: 'Recipe not found' });
        }
      } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ error: 'Error updating recipe with image path' });
      }
    } else {
      res.status(400).json({ error: 'File upload failed' });
    }
  });

  return router;
};

module.exports = { uploadedit };
