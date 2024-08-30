import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';



const Category = () => {
    const [recipes,setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                
                const response = await fetch(`https://recipe-website-lyart.vercel.app/retrieve/retrieve`);
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
  
        fetchRecipes();
    }, [Category]);

    const filteredRecipes = recipes.filter(recipes =>
        recipes.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleRecipeClick = (recipeId) => {
        navigate(`/recipe/${recipeId}`); 
    };

    return (
        <div>
            <Navbar />
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-4xl font-bold text-center mb-8">Food Search</h1>
            <input
                type="text"
                placeholder="Search your recipe"
                className="block mx-auto w-full max-w-lg p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-8"
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredRecipes.map(recipes => (
                    <div key={recipes.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={`https://recipe-website-lyart.vercel.app/${recipes.image}`} alt={recipes.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{recipes.title}</h2>
                            <p className="text-gray-800 mb-4">{recipes.description}</p>
                           <button className="bg-indigo-500 text-white px-4 py-2 rounded-md" onClick={() => handleRecipeClick(recipes._id)}>View Recipe</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default Category;
