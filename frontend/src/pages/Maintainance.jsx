import React from 'react';
import { Link } from 'react-router-dom';

const Maintainance = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl text-red-500 font-bold mb-4">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-700 mb-6">
          We are working hard to get this page up and running. Please check back later.
        </p>
        <div className="mb-6">
          <img
            src="404.jpg"
            alt="404 Not Found"
            className="w-full max-w-md mx-auto rounded-md"
          />
        </div>
        <Link to="/" className="inline-block px-6 py-3 bg-red-500 text-white text-lg font-medium rounded-md hover:bg-red-600 transition duration-300">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Maintainance;
