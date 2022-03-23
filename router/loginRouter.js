const express = require('express');

const { emailValidation, passwordValidation } = require('../middleware/loginValidation');
const { login } = require('../controllers/loginController');

const loginRouter = express.Router();

loginRouter.post('/', passwordValidation, emailValidation, login);

module.exports = loginRouter;