const express = require('express');

const { tokenValidation } = require('../middleware/tokenValidation');
const { addCategory, getAll } = require('../controllers/categoryController');

const categoryRouter = express.Router();

categoryRouter.post('/', tokenValidation, addCategory);
categoryRouter.get('/', tokenValidation, getAll);

module.exports = categoryRouter;