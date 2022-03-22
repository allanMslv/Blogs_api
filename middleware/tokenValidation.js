const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: decoded.data } });
    req.user = user;

    next();
  } catch (e) {
    return res.status(401).send({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  tokenValidation,
};