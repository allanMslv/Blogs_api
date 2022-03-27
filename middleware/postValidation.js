const { Category, BlogPost } = require('../models');

const postValidation = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
 
  if (!title) { return res.status(400).json({ message: '"title" is required' }); }
  if (!content) { return res.status(400).json({ message: '"content" is required' }); }
  if (!categoryIds) { return res.status(400).json({ message: '"categoryIds" is required' }); }
  const allCategories = await Category.findAll();
  const list = allCategories.map((category) => category.dataValues);
  const checkCategory = list.filter((category) => categoryIds.includes(category.id));
  
  if (checkCategory.length !== categoryIds.length) { 
    return res.status(400).json({ message: '"categoryIds" not found' }); 
  }
  
  next();
};

const userFromPostValidation = async (req, res, next) => {
  const currentUser = req.user.dataValues.id;
  const { id } = req.params;

  const result = await BlogPost.findByPk(id);
  if (!result) {
    return res.status(404).send({ message: 'Post does not exist' });
  }
  if (result.dataValues.userId !== currentUser) { 
    return res.status(401).send({ message: 'Unauthorized user' }); 
  }
  next();
};

const postUpdateValidation = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
 
  if (!title) { return res.status(400).json({ message: '"title" is required' }); }
  if (!content) { return res.status(400).json({ message: '"content" is required' }); }
  if (categoryIds) { return res.status(400).json({ message: 'Categories cannot be edited' }); }
  // const allCategories = await Category.findAll();
  // const list = allCategories.map((category) => category.dataValues);
  // const checkCategory = list.filter((category) => categoryIds.includes(category.id));
  
  // if (checkCategory.length !== categoryIds.length) { 
  //   return res.status(400).json({ message: '"categoryIds" not found' }); 
  // }
  
  next();
};

module.exports = {
  postValidation,
  userFromPostValidation,
  postUpdateValidation,
};