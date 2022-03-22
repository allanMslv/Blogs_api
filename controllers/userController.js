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

module.exports = {
  addUser,
};