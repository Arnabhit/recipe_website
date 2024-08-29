const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        //required: true,
        trim: true,
    },
    description: {
        type: String,
        //required: true,
        trim: true,
    },
    ingredients: [
        {
            name: { type: String}, //required: true },
            quantity: { type: String },
        }
    ],
    steps: [
        {
            stepNumber: { type: Number,  },
            instruction: { type: String, },
        }
    ],
    image: {
        type: String,  // URL or file path to the recipe image
        //required: true,
    },
    category: {
        type: String,
        enum: ['Vegetarian', 'Non-Vegetarian', 'Seasonal', 'Other'],  // Enum to categorize the recipe
        //required: true,
    },
    cookingTime: {
        type: Number, // Cooking time in minutes
        //required: true,
    },
    servings: {
        type: Number,  // Number of servings
        //required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the user who created the recipe
        //required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    tags: [
        {
            type: String,  // Additional tags for searching and filtering
            trim: true,
        }
    ],
    ratings: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number, min: 1, max: 5 },
            comment: { type: String, trim: true },
        }
    ],
    averageRating: {
        type: Number,
        default: 0,
    }
});

// recipeSchema.pre('save', function(next) {
//     this.updatedAt = Date.now();
//     next();
// });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
