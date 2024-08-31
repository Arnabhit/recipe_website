const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { setUserId } = require("../Services/auth");
require('dotenv').config();
const User = require('../Models/User'); // Ensure you have the User model imported

const handleUserSignup = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        if (!name || !password || !email) {
            return res.status(400).json({ error: 'Name, password, and email are required' });
        }

        const newUser = await User.create({
            name: name,
            password: password,
            email: email
        });

        const sessionId = uuidv4();
        setUserId(sessionId, newUser);
        res.cookie("uid", sessionId);

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.KEY, { expiresIn: '30d' });
        console.log(token);

        // Save token to user's document
        newUser.tokens = newUser.tokens.concat({ token });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser, token });
    } catch (error) {
        console.error('Error during user signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const handleUserSignin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        user.loginCount += 1;
        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.KEY, { expiresIn: '30d' });
        res.cookie('token', token, { httpOnly: true });

        const userDetails = {
            id: user._id,
            name: user.name,
            email: user.email,
            loginCount: user.loginCount,
            lastLogin: user.lastLogin
        };

        res.status(200).json({ message: 'Signin successful', token, userDetails });
        
    } catch (error) {
        console.error('Error during user signin:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    handleUserSignup,
    handleUserSignin,
};
