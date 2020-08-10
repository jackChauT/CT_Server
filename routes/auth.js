const jwt = require('express-jwt');
const secret = process.env.ACCESS_TOKEN_SECRET

function getTokenFromHeader(req){
    let authHeader = req.headers.authorization
    if (authHeader && req.headers.authorization.split(' ')[0] === 'Token' ||
        authHeader && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

var auth = {
    required: jwt({
      secret: secret,
      userProperty: 'payload',
      getToken: getTokenFromHeader,
      algorithms: ['HS256']
    })
};
  
module.exports = auth;