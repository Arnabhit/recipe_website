import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


const Allrecipes = () => {
  const [selectedFilters, setSelectedFilters] = useState(['All']); 
  const [recipes, setRecipes] = useState([]); 
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`https://recipe-website-1-yxg0.onrender.com/retrieve/retrieve`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }

        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

 
  const handleFilterChange = (filter) => {
    if (filter === 'All') {
        setSelectedFilters(['All']); 
    } else {
        setSelectedFilters((prevFilters) => {
            if (prevFilters.includes(filter)) {
                const newFilters = prevFilters.filter((f) => f !== filter);
                return newFilters.length === 0 ? ['All'] : newFilters;
            } else {
                return [...prevFilters.filter((f) => f !== 'All'), filter];
            }
        });
    }
  };

  const filteredRecipes = selectedFilters.includes('All')
    ? recipes
    : recipes.filter((recipe) => selectedFilters.includes(recipe.category));

  return (
    <div className="min-h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex pt-20">
      
        <div className="bg-slate-100 w-72 p-2">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <ul>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('All')}
                  onChange={() => handleFilterChange('All')}
                />
                All
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Vegetarian')}
                  onChange={() => handleFilterChange('Vegetarian')}
                />
                Vegetarian
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Non-Vegetarian')}
                  onChange={() => handleFilterChange('Non-Vegetarian')}
                 
                />
                Non-Vegetarian
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes('Seasonal')}
                  onChange={() => handleFilterChange('Seasonal')}
                />
                Seasonal
              </label>
            </li>
          </ul>
        </div>

        
        <div className="w-2/3 p-4 h-[100vh] overflow-auto">
          {filteredRecipes.length > 0 ? (
            <div className="flex flex-wrap -mx-2">
              {filteredRecipes.map((recipe) => (
                <div key={recipe._id} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4 ">
                  <div className="bg-white shadow-md rounded-lg overflow-hidden" onClick={() => handleRecipeClick(recipe._id)}>
                    <img src={`https://recipe-website-1-yxg0.onrender.com/${recipe.image}`} alt={recipe.title}   className="w-full h-48 object-cover cursor-pointer" />
                    
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{recipe.title}</h3>
                      <p className="text-gray-600 mt-2 line-clamp-2">{recipe.description}</p>
                      
                    </div>
                    
                  </div>
                  
                </div>
                
              ))}
            </div>
          ) : (
            <p>No recipes found.</p>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Allrecipes;
