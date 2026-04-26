const router = require('express').Router();
const {
  validateArticle,
  validateArticleId,
} = require('../middleware/validation');
const {
  getArticlesList,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/', getArticlesList);

router.post('/', validateArticle, createArticle);

router.delete('/:articleId', validateArticleId, deleteArticle);

module.exports = router;
