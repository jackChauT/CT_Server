const createError = require('http-errors');

function isBadRequest(param, name) {
  if (!param) throw createError.BadRequest(`${name} is not correct or Null`);
}

function isNotFound(param, name) {
  if (!param) throw createError.NotFound(`${name} not found`);
}

module.exports = {
  isBadRequest,
  isNotFound,
};
