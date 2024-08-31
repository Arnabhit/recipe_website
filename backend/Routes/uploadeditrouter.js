// routes/business.js
const express = require('express');
const {uploadedit} = require('../Controllers/uploadedit');

const router = express.Router();

router.get('/upload', uploadedit);

module.exports = router;
