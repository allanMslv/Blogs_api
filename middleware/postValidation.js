const { Category } = require('../models');

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

module.exports = {
  postValidation,
};