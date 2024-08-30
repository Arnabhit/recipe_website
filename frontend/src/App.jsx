import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Recipe from './pages/Recipe';
import RecipeDescription from './pages/RecipeDescription';
import Allrecipes from './pages/Allrecipes';
import Category from './pages/Category';
import ReviewRecipe from './pages/ReviewRecipe';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Routes>
       <Route index element={<Home />} />
       <Route path="/signin" element={<Signin />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/recipe" element={<Recipe />} />
       <Route path="/recipe/:recipeId" element={<RecipeDescription />} />
       <Route path="/allrecipes" element={<Allrecipes />} />
       <Route path="/Category" element={<Category/>} />
       <Route path="/ReviewRecipe/:reviewId/rec" element={<ReviewRecipe/>} />

       
      
      {/* <Routes>
        <Route index element={<HomePage />} />
        <Route path="/business" element={<BusinessPage />} />
      </Routes> */}
       </Routes>
    </Router>
      
    </>
  ) 
}

export default App
