const express = require('express');
const cors = require('cors');
const userrouter = require('./Routes/user');
const reciperouter = require('./Routes/recipe');
const cookieparser = require('cookie-parser');
const mongoose = require('mongoose'); // Ensure mongoose is required
const path = require('path');
const app = express();
const retrieveRecipe = require('./Routes/retrieveRecipe');
const retrieveRecipeById = require('./Routes/retrieveRecipeById');
const reviewrecipe = require('./Routes/reviewrecipe');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // middleware to parse json bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

const connectDb = async (uri) => {
  try {
    await mongoose.connect(uri, {
      
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error("Error connecting to DB", err);
  }
};

connectDb("mongodb+srv://ARNAB123:aRNAB@cluster0.cqdf1cj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/recipe");

app.use("/user",userrouter);
app.use("/recipe",reciperouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/retrieve", retrieveRecipe);
app.use("/retrieveById", retrieveRecipeById);
app.use("/ReviewRecipe", reviewrecipe);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
