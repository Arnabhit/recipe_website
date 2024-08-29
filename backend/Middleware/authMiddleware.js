const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const { model } = require('mongoose');

const authMiddleware = async (req, res, next) => {
  //console.log("middleware",req.body)
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      console.log('Authorization header missing');
      return res.status(401).json({ error: 'Authorization header missing' });
    }
  
    const token = authHeader.replace('Bearer ', '');
   // console.log('Token:', token); // Log token for debugging
    
    try {
      const decoded = jwt.verify(token, process.env.KEY);
      //console.log('Decoded Token:', decoded); // Log decoded token for debugging
  
      const user = await User.findById(decoded.userId);
      if (!user) {
        console.log('User not found for ID:', decoded.userId);
        return res.status(401).json({ error: 'User not found' });
      }
  
      req.user = user;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ error: 'Authentication failed. Please authenticate.' });
    }
  };
module.exports = {authMiddleware};  