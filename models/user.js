module.exports = (sequelize, DataTypes) => {  
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  User.associate = (models) => {
    models.User.hasMany(models.BlogPost, { foreignKey: 'user_id', as: 'BlogPosts' });
  };

  return User;
};