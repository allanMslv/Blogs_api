const express = require('express');

const postController = require('../controllers/postController');
const { 
  postValidation, 
  userFromPostValidation, 
  postUpdateValidation,
} = require('../middleware/postValidation');
const { tokenValidation } = require('../middleware/tokenValidation');

const postRouter = express.Router();

postRouter.post('/', tokenValidation, postValidation, postController.addPost);
postRouter.get('/', tokenValidation, postController.getAll);
postRouter.get('/:id', tokenValidation, postController.getById);
postRouter.delete('/:id', tokenValidation, userFromPostValidation, postController.exclude);
postRouter.put(
  '/:id', 
  tokenValidation, 
  userFromPostValidation, 
  postUpdateValidation, 
  postController.update,
  );

module.exports = postRouter;