const { User } = require('../models');

const addUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const created = await User.create({ displayName, email, password, image });

    return res.status(201).send(created);
  } catch (e) {
    console.log(e.message);
    res.status(500).end();
    return next();
  }
};

module.exports = {
  addUser,
};