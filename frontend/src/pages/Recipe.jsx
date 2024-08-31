import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";

const Recipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    ingredients: [{ name: '', quantity: '' }],
    steps: [{ stepNumber: 1, instruction: '' }],
    category: '',
    cookingTime: '',
    servings: '',
    tags: [],
    author:'',
  });
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast('Please log in first!');
      navigate('/signin'); 
    }
    else
    {
      const decodedToken = jwtDecode(token);
      setRecipeData((prevData) => ({
        ...prevData,
        author: decodedToken.userId,
      }));
    }
  }, [navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  
  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const ingredients = [...recipeData.ingredients];
    ingredients[index][name] = value;
    setRecipeData({ ...recipeData, ingredients });
  };

  
  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    const steps = [...recipeData.steps];
    steps[index][name] = value;
    setRecipeData({ ...recipeData, steps });
  };


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  
  const handleAddIngredient = () => {
    setRecipeData({
      ...recipeData,
      ingredients: [...recipeData.ingredients, { name: '', quantity: '' }],
    });
  };

  const handleAddStep = () => {
    setRecipeData({
      ...recipeData,
      steps: [...recipeData.steps, { stepNumber: recipeData.steps.length + 1, instruction: '' }],
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in recipeData) {
      if (Array.isArray(recipeData[key])) {
        formData.append(key, JSON.stringify(recipeData[key])); 
      } else {
        formData.append(key, recipeData[key]);
      }
    }
    if (image) {
      formData.append('image', image); 
    }

    const token = localStorage.getItem('token');
    
  
    if (!token) {
      toast('Please log in first!');
      navigate('/login'); 
      return;
    }
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    formData.append('authorId', userId);

    try {
      const response = await fetch('http://localhost:3000/recipe/post-recipe', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        toast('Recipe submitted successfully!');
        console.log('Recipe submitted:', result);
        navigate('/'); 
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        toast.error('Error submitting recipe');
      }
    } catch (error) {
      console.error('Network error:', error);
      toast('Network error');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Submit a Recipe</h2>
      
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Recipe Title
          </label>
          <input
            type="text"
            name="title"
            value={recipeData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
       
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={recipeData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
       
        <div className="mb-4 flex flex-col ">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ingredients</label>
          {recipeData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                name="name"
                placeholder="Ingredient Name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                required
              />
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          ))}
          <div className='flex'>
          <button
            type="button"
            onClick={handleAddIngredient}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-40"
          >
            Add Ingredient
          </button>
          </div>
         
        </div>
        
        <div className="mb-4 flex flex-col">
          <label className="block text-gray-700 text-sm font-bold mb-2">Preparation Steps</label>
          {recipeData.steps.map((step, index) => (
            <div key={index} className="mb-2">
              <label className="block text-gray-700 text-sm mb-1">Step {index + 1}</label>
              <textarea
                name="instruction"
                value={step.instruction}
                onChange={(e) => handleStepChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          ))}
          <div className="flex">
          <button
            type="button"
            onClick={handleAddStep}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-40"
          >
            Add Steps
          </button>
          </div>
          
        </div>
       
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            value={recipeData.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Seasonal">Seasonal</option>
            <option value="Other">Other</option>
          </select>
        </div>
      
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cookingTime">
            Cooking Time (in minutes)
          </label>
          <input
            type="number"
            name="cookingTime"
            value={recipeData.cookingTime}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="servings">
            Servings
          </label>
          <input
            type="number"
            name="servings"
            value={recipeData.servings}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={recipeData.tags.join(', ')}
            onChange={(e) => setRecipeData({ ...recipeData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Recipe Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
          />
        </div>
        
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default Recipe;
