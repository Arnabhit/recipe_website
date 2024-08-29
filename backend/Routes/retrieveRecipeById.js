const express = require('express');
const router = express.Router();
const {retrieveRecipeById}= require('../Controllers/retrieveRecipeById');
const {updateRecipeById}= require('../Controllers/updateRecipeById');



router.get('/retrieve/:id', retrieveRecipeById);
router.put('/retrieve/:id',updateRecipeById);

module.exports = router;
