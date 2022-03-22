const { User } = require('../models');

const emailValidation = async (res, email) => {
  if (!email) { return res.status(400).json({ message: '"email" is required' }); }
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) { 
    return res.status(400).json({ message: '"email" must be a valid email' }); 
  }
  const isRegistered = await User.findAll({
    where: {
      email,
    },
  });
  if (isRegistered.length !== 0) {
    return res.status(409).json({ message: 'User already registered' });
  }
};

const userValidation = (req, res, next) => {
  const { displayName, password, email } = req.body;
 
  if (displayName.length < 8) { 
    return res.status(400).json({ 
      message: '"displayName" length must be at least 8 characters long', 
    }); 
  }
  if (!password) { return res.status(400).json({ message: '"password" is required' }); }

  if (password.length < 6) { 
    return res.status(400).json({ 
      message: '"password" length must be 6 characters long', 
    }); 
  }
  emailValidation(res, email);
  
  next();
};

module.exports = {
  userValidation,
};