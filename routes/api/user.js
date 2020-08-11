/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
const mongoose = require('mongoose');
const router = require('express').Router();

const User = mongoose.model('User');
const Auth = mongoose.model('Auth');
const createError = require('http-errors');
const { isBadRequest, isNotFound } = require('../../helper/errorCheck');

const {
  generateToken,
  generateRefreshToken,
  verifyPassword,
} = require('../../helper/auth');
const {
  saveRefreshToken,
  deactivateRefreshToken,
} = require('../../controller/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    isBadRequest(email, 'email');
    isBadRequest(password, 'password');

    let user = await User.findOne({ email });

    isNotFound(user, 'User');
    verifyPassword(password, user.passwordHash);

    const accessToken = await generateToken(user.id);
    const newRefreshToken = await generateRefreshToken(user.id);
    await saveRefreshToken(user.id, newRefreshToken);

    user = user.toJSON();
    user.accessToken = accessToken;
    user.refreshToken = newRefreshToken;
    return res.json(user);
  } catch (err) {
    next(err);
  }
}
async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    isBadRequest(email, 'email');
    isBadRequest(password, 'password');

    const isExist = await User.findOne({ email });
    if (isExist) {
      throw createError.Conflict(`${email} has already registered`);
    }

    let user = new User(req.body);
    user.setPassword(password);

    const savedUser = await user.save();

    const accessToken = await generateToken(savedUser.id);
    const newRefreshToken = await generateRefreshToken(savedUser.id);

    await saveRefreshToken(savedUser.id, newRefreshToken);

    user = user.toJSON();
    user.accessToken = accessToken;
    user.refreshToken = newRefreshToken;

    return res.json(user);
  } catch (err) {
    next(err);
  }
}

/**
 * Logout and deactivate refresh token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function logout(req, res, next) {
  try {
    const { id } = req.body;
    isBadRequest(id, 'id');

    await deactivateRefreshToken(id);

    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;
    isBadRequest(refreshToken, 'refreshToken');
    const foundAuth = await Auth.findOne({
      refreshToken,
      isActive: true,
      expires: {
        $gte: new Date(),
      },
    });
    isNotFound(foundAuth, 'Token');
    // throw createError.Forbidden();
    const accessToken = await generateToken(foundAuth.user);
    const newRefreshToken = await generateRefreshToken(foundAuth.user);

    await saveRefreshToken(foundAuth.user, newRefreshToken);

    return res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    next(err);
  }
}
module.exports = router;
