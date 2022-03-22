const { User } = require('../models');

const emailRegisterValidation = async (email) => {
  const isRegistered = await User.findAll({
    where: {
      email,
    },
  });
  console.log(isRegistered.length);
  if (isRegistered.length === 0) { return false; } 
  return true;
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  
  if (password === undefined) { 
    return res.status(400).json({ message: '"password" is required' }); 
  }
  if (password === '') { 
    return res.status(400).json({ message: '"password" is not allowed to be empty' }); 
  } 
  next();
};

const emailValidation = async (req, res, next) => {
  const { email } = req.body;
  
  if (email === undefined) { return res.status(400).json({ message: '"email" is required' }); }
  if (email === '') { 
    return res.status(400).json({ message: '"email" is not allowed to be empty' }); 
  }
  const validation = await emailRegisterValidation(email);
  if (!validation) {
    return res.status(400).json({ message: 'Invalid fields' });
  }  
  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
};