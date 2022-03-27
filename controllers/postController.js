const { BlogPost, User, Category, PostsCategory } = require('../models');

const addPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.dataValues.id;

    const result = await BlogPost.create({ title, content, userId, published: new Date() });
    return res.status(201).send(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).end();
    return next();
  }
};

const getAll = async (req, res, next) => {
  try {
  const result = await BlogPost.findAll({
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories' }],
    });
    const posts = result.map((post) => {
      const { id, title, content, published, updated, userId, user, categories } = post.dataValues;
      const u = user.dataValues;
      const ctg = categories[0].dataValues;
      const f = { id, title, content, published, updated, userId, user: u, categories: [ctg] };
      return f;
    });
    return res.status(200).send(posts);
  } catch (e) {
    res.status(500).end();
    return next();
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await BlogPost.findByPk(req.params.id);
    if (!result) {
      return res.status(404).send({ message: 'Post does not exist' });
    }
    const post = result.dataValues;
    const user = req.user.dataValues;
    const categ = await PostsCategory.findAll({ where: { postId: post.id } });
    const { categoryId } = categ[0].dataValues;
    const categresult = await Category.findByPk(categoryId);
    const categories = categresult.dataValues;

    return res.status(200).send({ ...post, user, categories: [categories] });
  } catch (e) {
    console.log(e.message);
    res.status(500).end();
    return next();
  }
};

const exclude = async (req, res, next) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    await post.destroy();
    return res.status(204).end();
  } catch (e) {
    console.log(e.message);
    res.status(500).end();
    return next();
  }
};

const update = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await BlogPost.findByPk(req.params.id);

    post.dataValues.title = title;
    post.dataValues.content = content;
    await post.save();

    const userId = req.user.dataValues.id;
    const updatedPost = { title, content, userId };

    const categ = await PostsCategory.findAll({ where: { postId: post.dataValues.id } });
    const { categoryId } = categ[0].dataValues;
    const categresult = await Category.findByPk(categoryId);
    const categories = categresult.dataValues;

    return res.status(200).send({ ...updatedPost, categories: [categories] });
  } catch (e) {
    console.log(e.message);
    res.status(500).end();
    return next();
  }
};

module.exports = {
  addPost,
  getAll,
  getById,
  exclude,
  update,
};