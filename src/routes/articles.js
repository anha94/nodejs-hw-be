var express = require('express');
var router = express.Router();
const articlesController = require('../controllers/articles.controller');

router.get('/', articlesController.getAll);

router.get('/:id', articlesController.getById);

router.post('/', articlesController.create);

module.exports = router;
