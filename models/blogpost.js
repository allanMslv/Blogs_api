module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });

  BlogPost.associate = (models) => {
    models.BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return BlogPost;
};