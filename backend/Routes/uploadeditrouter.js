// routes/business.js
const express = require('express');
const {uploadedit} = require('../Controllers/uploadedit');

const router = express.Router();

// Define the route for retrieving businesses
router.get('/upload', uploadedit);

module.exports = router;
