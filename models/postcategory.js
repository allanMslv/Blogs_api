module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {}, { timestamps: false });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'blogPosts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostCategory;
};