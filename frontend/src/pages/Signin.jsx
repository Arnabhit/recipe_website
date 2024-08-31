import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { email, password };

    try {
      const response = await fetch('https://recipe-website-1-yxg0.onrender.com/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log(response)
        const result = await response.json();
       // console.log(result)
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.userDetails));
        toast(`welcome back ${JSON.stringify(userData)}`);
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        toast('Error logging in');
      }
    } catch (error) {
      console.error('Network error:', error);
      toast('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
        <div className="hidden lg:block w-full lg:w-1/2 relative">
          <img src="signin.jpg" alt="Background" className="object-cover w-full h-full rounded-xl" />
          <div className="absolute inset-0 flex items-end mb-16 justify-center rounded-xl">
            <h2 className="text-white text-4xl font-bold">Exploring the world to its fullest</h2>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-4xl font-bold mb-8 text-center">Login to your account</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-md">Login</button>
          </form>
          <p className="mt-6 text-center">
            New user? <Link to="/signup" className="text-orange-500">Create an account</Link>
          </p>
          <div className="mt-6 text-center">
            <p>Or login using</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button className="text-2xl"><i className="fab fa-google"></i></button>
              <button className="text-2xl"><i className="fab fa-facebook"></i></button>
              <button className="text-2xl"><i className="fab fa-twitter"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
