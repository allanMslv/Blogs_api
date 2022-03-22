const express = require('express');

const { userValidation } = require('../middleware/userValidation');
const userController = require('../controllers/userController');
const { tokenValidation } = require('../middleware/tokenValidation');

const userRouter = express.Router();

userRouter.post('/', userValidation, userController.addUser);
userRouter.get('/', tokenValidation, userController.getAll);

module.exports = userRouter;