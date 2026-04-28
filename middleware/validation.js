const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

function validateURL(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    username: Joi.string().required().min(2).max(30),
  }),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(24),
  }),
});

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    publishedAt: Joi.string().required(),
    source: Joi.string().required(),
    url: Joi.string().required().custom(validateURL),
    urlToImage: Joi.string().required().custom(validateURL),
  }),
});

module.exports = {
  validateUser,
  validateLogin,
  validateArticle,
  validateArticleId,
};
