import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-orange-400 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold ml-5">Recipe Haven</h2>
          <p className="text-sm mt-2 ml-5">Connecting you with the best recipes in town.</p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/maintain" className="text-white hover:text-gray-300">About Us</Link>
          <Link to="/Contact" className="text-white hover:text-gray-300">Contact</Link>
          <Link to="/recipe" className="text-white hover:text-gray-300">List Your Recipe</Link>
          <Link to="/maintain" className="text-white hover:text-gray-300">Terms & Conditions</Link>
          <Link to="/maintain" className="text-white hover:text-gray-300">Privacy Policy</Link>
        </div>

        <div className="flex justify-center md:justify-end space-x-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 pr-4">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      <div className="mt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Recipe Haven. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;



