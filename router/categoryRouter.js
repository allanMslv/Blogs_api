const express = require('express');

const { tokenValidation } = require('../middleware/tokenValidation');
const { addCategory } = require('../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.post('/', tokenValidation, addCategory);

module.exports = categoryRouter;