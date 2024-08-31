const express = require('express');
const multer = require('multer');
const path = require('path');
const Recipe = require('../Models/Recipe'); 

const uploadedit = () => {
  const app = express(); 
  const router = express.Router(); 

  // Set up multer storage
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname); 
    }
  });

  const upload = multer({ storage: storage });

  // Upload endpoint
  router.post('/upload', upload.single('image'), async (req, res) => {
    if (req.file) {
      const filePath = `/uploads/${req.file.filename}`;
      
      try {
        
        const { recipeId } = req.body;

       
        const updatedRecipe = await Recipe.findByIdAndUpdate(
          recipeId,
          { image: filePath },
          { new: true } 
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
