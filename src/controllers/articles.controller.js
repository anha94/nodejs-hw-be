const articleService = require('../services/articles.service');
const responseHandler = require('../helpers/responseHandler');

exports.getAll = async (req, res, next) => {
  try {
    const result = await articleService.getAll();
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await articleService.getById(id);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const result = await articleService.create(req);
    responseHandler.sendJsonSuccess(res)(result);
  } catch (err) {
    next(err);
  }
};