import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewRecipe = () => {
    const recipeId = window.location.pathname.split("/")[2];

   
    console.log("recipeId from frontend",recipeId);
    const [review, setReview] = useState({ recipeId, category: '', rating: 0, comment: '' });
    const [submitted, setSubmitted] = useState(false);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleRatingChange = (rating) => {
        setReview({ ...review, rating });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/ReviewRecipe/recipe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(review),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response from server:', errorData);
                throw new Error('Failed to submit review');
            }

            toast.success('Review submitted successfully');
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
            <Navbar />
            <div className="container mx-auto py-12 px-4 flex-grow mt-28">
                <h1 className="text-4xl font-bold text-center text-green-600 mb-12">Submit Your Review</h1>

                <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-lg font-semibold mb-2 text-gray-700">What you like the most in the recipe</label>
                            <select
                                name="category"
                                value={review.category}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="Food">Food</option>
                                <option value="Cooking style">Cooking style</option>
                                <option value="Value of money">Value of money</option>
                                <option value="Taste">Taste</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-2 text-gray-700">Rating</label>
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingChange(star)}
                                        className={`text-2xl ${review.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-2 text-gray-700">Comment</label>
                            <textarea
                                name="comment"
                                value={review.comment}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                rows="4"
                                placeholder="Share your experience with us"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default ReviewRecipe;
