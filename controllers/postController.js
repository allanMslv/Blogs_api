const { BlogPost } = require('../models');
// const User = require('../models/user');

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

// const getAll = async (req, res, next) => {
//   try {
//     const result = await BlogPost.findAll({ attributes: { exclude: 'password' } });
//     const posts = result.map((post) => post.dataValues);
//     console.log(posts);

//     return res.status(200).send(result);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).end();
//     return next();
//   }
// };

// const getById = async (req, res, next) => {
//   try {
//     const result = await BlogPost.findByPk(req.params.id);
//     if (!result) {
//       return res.status(404).send({ message: 'Post does not exist' });
//     }
//     const post = result.dataValues;
//     const user = req.user.dataValues;
//     console.log(post.id);
//     // const categories = await PostCategory.findAll({ where: { postId: post.id } });
//     // console.log(categories);

//     return res.status(200).send({ ...post, user });
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).end();
//     return next();
//   }
// };

module.exports = {
  addPost,
  // getAll,
  // getById,
};