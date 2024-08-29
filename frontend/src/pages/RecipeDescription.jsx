import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecipeDescription = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userDetails = localStorage.getItem('user');

        if (token && userDetails) {
            try {
                const user = JSON.parse(userDetails);
                setCurrentUser(user);
            } catch (error) {
                console.error('Error parsing user details:', error);
            }
        } else {
            toast.error('You must be logged in to edit recipes');
            navigate('/signin'); // Redirect to login page if not logged in
        }
    }, [navigate]);

    const handleEdit = () => {
        if (currentUser && currentUser.id === recipe.author) {
            setFormData({
                title: recipe.title,
                description: recipe.description,
                ingredients: recipe.ingredients.join('\n'), // Join ingredients array into a string for textarea
                steps: recipe.steps.map(step => step.instruction).join('\n'), // Join steps array into a string for textarea
            });
            setIsModalOpen(true);
        } else {
            toast.error('You are not allowed to edit this recipe');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/retrieveById/retrieve/${recipeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update recipe');
            }

            const updatedRecipe = await response.json();
            setRecipe(updatedRecipe.recipe); // Update the recipe state with the new data
            toast.success('Recipe updated successfully!');
        } catch (error) {
            console.error('Error updating recipe:', error);
            toast.error('Failed to update recipe');
        } finally {
            handleCloseModal();
        }
    };

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:3000/retrieveById/retrieve/${recipeId}`);
                if (!response.ok) {
                    throw new Error('Recipe not found');
                }
                const data = await response.json();
                setRecipe(data.recipe);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recipe:', error);
                toast.error('Failed to fetch recipe');
                navigate('/');
            }
        };

        fetchRecipe();
    }, [recipeId, navigate]);

    if (loading) return <p>Loading...</p>;
    if (!recipe) return <p>Recipe not found</p>;

    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-12 px-4 pt-24">
                <ToastContainer />
                <h2 className="text-3xl font-bold mb-6">{recipe.title}</h2>
                <img src={`http://localhost:3000/${recipe.image}`} alt={recipe.title} className="w-full h-64 object-cover mb-4" />
                <p className="text-gray-800 mb-4">{recipe.description}</p>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Ingredients</h2>
                    <ul className="list-disc ml-5 mt-2">
                        {recipe.ingredients && recipe.ingredients.length > 0 ? (
                            recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.name}: {ingredient.quantity}
                                </li>
                            ))
                        ) : (
                            <p>No ingredients available.</p>
                        )}
                    </ul>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Steps</h2>
                    <ol className="list-decimal ml-5 mt-2">
                        {recipe.steps.map((step, index) => (
                            <li key={index}>
                                Step {step.stepNumber}: {step.instruction}
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Reviews</h2>
                    {recipe.ratings.length > 0 ? (
                        <ul className="mt-2">
                            {recipe.ratings.map((review, index) => (
                                <li key={index} className="border-b py-2">
                                    <strong>{review.author}:</strong> {review.comment}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>

                <div className="mt-8">
                    {currentUser && currentUser.id === recipe.author && (
                        <button
                            onClick={handleEdit}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Edit Recipe
                        </button>
                    )}
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">Edit Recipe</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Ingredients</label>
                                    <textarea
                                        name="ingredients"
                                        value={formData.ingredients}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Enter ingredients as a list, one per line.</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Steps</label>
                                    <textarea
                                        name="steps"
                                        value={formData.steps}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Enter steps as a list, one per line.</p>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeDescription;
