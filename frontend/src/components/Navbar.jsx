import React, { useState, useEffect } from 'react';
import { useNavigate,Link} from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({}); // Define user state to store user details
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDetails = localStorage.getItem('user');

    if (token) {
      try {
        const user = userDetails ? JSON.parse(userDetails) : null;
        console.log("user", user);
        if (user) {
          setIsLoggedIn(true);
          setUser(user); // This is where the user state is updated
        }
      } catch (error) {
        console.error('Error parsing user details:', error);
      }
    }
  }, []);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUser({}); // Clear user details
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/'); // Optionally navigate to home or login page after logout
  };

  return (
    <nav className="bg-slate-800 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-white text-2xl font-bold">Recipe Haven</div>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <ul className={`lg:flex lg:items-center lg:space-x-8 ${isOpen ? 'block' : 'hidden'} lg:block`}>
          <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
          <li><Link to="/allrecipes" className="text-white hover:text-gray-300">Recipes</Link></li>
          <li><Link to="/Category" className="text-white hover:text-gray-300">Categories</Link></li>
          <li><a href="/recipe" className="text-white hover:text-gray-300">Submit Recipe</a></li>
          {isLoggedIn ? (
            <>
              <li>
                <img
                  src={user.profilePhoto || 'profile.png'}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              </li>
              <li>
                <button
                  onClick={handleSignOut} // Correctly pass the function reference
                  className="text-white hover:text-gray-300 focus:outline-none"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><a href="/signup" className="text-white hover:text-gray-300">Sign Up</a></li>
              <li><a href="/signin" className="text-white hover:text-gray-300">Login</a></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
