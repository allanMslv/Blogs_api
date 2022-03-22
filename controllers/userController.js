const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const secret = process.env.JWT_SECRET;

const addUser = async (req, res, next) => {
  const config = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  try {
    const { displayName, email, password, image } = req.body;

    await User.create({ displayName, email, password, image });
    const token = jwt.sign({ data: displayName, email, password }, secret, config);
    return res.status(201).send({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).end();
    return next();
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: 'password' } });
    return res.status(200).send(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).end();
    return next();
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await User.findByPk(req.params.id, { attributes: { exclude: 'password' } });
    if (!result) {
      return res.status(404).send({ message: 'User does not exist' });
    }
    return res.status(200).send(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).end();
    return next();
  }
};

module.exports = {
  addUser,
  getAll,
  getById,
};