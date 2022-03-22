const express = require('express');

const { emailValidation, passwordValidation } = require('../middleware/loginValidation');
// const loginController = require('../controllers/userController');
const { login } = require('../controllers/loginController');

const loginRouter = express.Router();

loginRouter.post('/', passwordValidation, emailValidation, login);

module.exports = loginRouter;