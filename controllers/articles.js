const Article = require('../models/article');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

async function getArticlesList(req, res, next) {
  const userId = req.user._id;
  await Article.find({ owner: userId })
    .then((articles) => res.send(articles))
    .catch(next);
}

async function createArticle(req, res, next) {
  const {
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
    isSaved,
  } = req.body;
  const userId = req.user._id;
  await User.findById(userId)
    .then((user) => {
      Article.create({
        keyword,
        title,
        description,
        publishedAt,
        source,
        url,
        urlToImage,
        isSaved,
        owner: user._id,
      })
        .then((article) => res.status(201).send(article))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError(err.message);
          }
          next(err);
        })
        .catch(next);
    })
    .catch(() => {
      throw new NotFoundError(
        'El usuario que quiere guardar el artículo no esta registrado',
      );
    })
    .catch(next);
}

async function deleteArticle(req, res, next) {
  const { articleId } = req.params;
  const userId = req.user._id;
  await Article.findById(articleId)
    .orFail(() => {
      throw new NotFoundError('No se ha encontrado ningun artículo con esa ID');
    })
    .then((article) => {
      if (article.owner.toString() !== userId) {
        throw new ForbiddenError(
          'No tienes permisos para eliminar este artículo',
        );
      }
      return Article.findByIdAndDelete(articleId);
    })
    .then((article) => {
      res.send({ message: 'Artículo eliminado', data: article });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('ID de artículo inválido');
      }
      next(err);
    })
    .catch(next);
}

module.exports = { getArticlesList, createArticle, deleteArticle };
