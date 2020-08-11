const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

async function generateToken(userId) {
  return new Promise((resolve, reject) => {
    jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' }, (err, token) => {
      if (err) {
        reject(createError.ExpectationFailed());
        return;
      }
      resolve(token);
    });
  });
}

async function generateRefreshToken(userId) {
  return new Promise((resolve, reject) => {
    jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, (err, token) => {
      if (err) {
        reject(createError.ExpectationFailed());
        return;
      }
      resolve(token);
    });
  });
}

function verifyPassword(password, hashedPassword) {
  if (!bcrypt.compareSync(password, hashedPassword)) {
    throw createError.BadRequest('Username or password is incorrect');
  }
}

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyPassword,
};
