import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {  FaGoogle, FaFacebook } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Move useNavigate inside the component

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { name, email, password };

    try {
      const response = await fetch('https://recipe-website-lyart.vercel.app/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User created:', result);
        toast('Account created successfully'); // Use toast.success for a success message
        navigate("/signin");
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        toast(`Error: ${errorData.message}`); // Show error toast
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Network error occurred.'); // Show network error toast
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:block w-full lg:w-1/2 relative">
          <img src="signup.jpg" alt="Background" className="object-cover w-full h-full rounded-xl" />
          <div className="absolute inset-0 flex items-end mb-14 justify-center rounded-xl">
            <h2 className="text-white text-4xl font-bold">Exploring the world to its fullest</h2>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-4xl font-bold mb-8 text-center">Create an account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="input-group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="input-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-md">Create account</button>
          </form>
          <p className="mt-6 text-center">
            Existing user? <Link to="/signin" className="text-orange-500">Login</Link>
          </p>
          <div className="mt-6 text-center">
            <p>Or sign up using</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button className="text-2xl"><i className="fab fa-google"></i>
              <FaFacebook size={24} /></button>
              <button className="text-2xl"><i className="fab fa-facebook"></i></button>
              <button className="text-2xl"><i className="fab fa-twitter"></i></button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Render ToastContainer */}
    </div>
  );
};

export default Signup;
