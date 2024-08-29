import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ReviewRecipe = () => {
    const [review, setReview] = useState({ name: '', rating: 0, comment: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleRatingChange = (rating) => {
        setReview({ ...review, rating });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (review.name && review.rating && review.comment) {
            // Handle form submission, e.g., send data to server
            setSubmitted(true);
            setReview({ name: '', rating: 0, comment: '' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
            <Navbar />
            <div className="container mx-auto py-12 px-4 flex-grow mt-28">
                <h1 className="text-4xl font-bold text-center text-green-600 mb-12">Submit Your Review</h1>

                {submitted && (
                    <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-center">
                        Thank you for your review!
                    </div>
                )}

                <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-lg font-semibold mb-2 text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={review.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                                placeholder="Enter your name"
                                required
                            />
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
        </div>
    );
};

export default ReviewRecipe;
