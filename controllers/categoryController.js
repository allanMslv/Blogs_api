const { Category } = require('../models');

const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ message: '"name" is required' });
    }

    const result = await Category.create({ name });
    return res.status(201).send(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).end();
    return next();
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await Category.findAll();
    return res.status(200).send(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).end();
    return next();
  }
};

module.exports = {
  addCategory,
  getAll,
};