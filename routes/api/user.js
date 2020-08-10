const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const Auth = mongoose.model('Auth');
const bcrypt = require('bcryptjs');
const createError = require('http-errors')
const { isBadRequest, isNotFound } = require('../../helper/errorCheck')

const {
    generateToken,
    generateRefreshToken,
    verifyPassword
} = require('../../helper/auth');
const {
    saveRefreshToken,
    deactivateRefreshToken
} = require('../../controller/auth')

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken)


async function login(req, res, next) {
    try {
        var {email, password} = req.body;
        isBadRequest(email, 'email')
        isBadRequest(password, 'password')
        
        var user = await User.findOne({ email });

        isNotFound(user, 'User')
        verifyPassword(password, user.passwordHash)
    
        var accessToken = await generateToken(user.id)
        var refreshToken = await generateRefreshToken(user.id)
        
        await saveRefreshToken(user.id, refreshToken)
        
        user = user.toJSON();
        user.accessToken = accessToken
        user.refreshToken = refreshToken
        return res.json(user);
    } catch(err) {
        next(err)
    }
    
}
async function register(req, res, next) {
    try {
        var {email, password} = req.body;
        isBadRequest(email, 'email')
        isBadRequest(password, 'password')

        var isExist = await User.findOne({ email })
        if (isExist) {
            throw createError.Conflict(`${email} has already registered`)
        }
        
        var user = new User(req.body)
        user.setPassword(password)

        var savedUser = await user.save()

        var accessToken = await generateToken(savedUser.id)
        var refreshToken = await generateRefreshToken(savedUser.id)

        await saveRefreshToken(savedUser.id, refreshToken)

        user = user.toJSON();
        user.accessToken = accessToken
        user.refreshToken = refreshToken

        return res.json(user)
    } catch(err) {
        next(err)
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
        var { id } = req.body
        console.log(req.body)
        isBadRequest(id, 'id')

        await deactivateRefreshToken(id)

        return res.sendStatus(204)
    } catch (err) {
        next(err)
    }
}

async function refreshToken(req, res, next) { 
    try {
        var { refreshToken } = req.body
        isBadRequest(refreshToken, 'refreshToken')

        var foundAuth = await Auth.findOne({ refreshToken: refreshToken, 
            isActive: true, 
            expires:{
                $gte: new Date()
            }})
        isNotFound(foundAuth, 'Token')
        throw createError.Forbidden()
        var accessToken = await generateToken(foundAuth.user)
        var refreshToken = await generateRefreshToken(foundAuth.user)

        await saveRefreshToken(foundAuth.user, refreshToken)

        return res.json({accessToken, refreshToken})
    } catch (err) {
        next(err)
    }
}
module.exports = router