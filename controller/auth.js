const mongoose = require('mongoose');

const Auth = mongoose.model('Auth');

const { isNotFound } = require('../helper/errorCheck');

async function saveRefreshToken(userId, token) {
  let auth = await Auth.findOne({ user: userId });
  if (!auth) {
    auth = new Auth({
      user: userId,
      refreshToken: token,
      expires: new Date(Date.now() + 7 * 24 * 3600 * 1000), // 1 week
      isActive: true,
    });
  } else {
    auth.refreshToken = token;
    auth.expires = new Date(Date.now() + 7 * 24 * 3600 * 1000); // 1 week
    auth.revoked = Date.now();
    auth.isActive = true;
  }

  return auth.save();
}

async function deactivateRefreshToken(id) {
  const foundAuth = await Auth.findOne({ user: id });

  isNotFound(foundAuth, 'Token');

  foundAuth.isActive = false;
  return foundAuth.save();
}

module.exports = {
  saveRefreshToken,
  deactivateRefreshToken,
};
