const jwt = require('jsonwebtoken');

require('dotenv/config');

const secret = process.env.JWT_SECRET;

const login = async (req, res, next) => {
  const config = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  
  try {
    const { email, password } = req.body;
    const token = jwt.sign({ data: email, password }, secret, config);
    return res.status(200).send({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).end();
    return next();
  }
};

module.exports = {
  login,
};