const express = require('express');

const { userValidation } = require('../middleware/userValidation');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/', userValidation, userController.addUser);

module.exports = userRouter;