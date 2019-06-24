const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const isAuth = async (req, res, next) => {
  try {
    const tokenCookie = req.cookies.authToken.split(' ')[1];
    await jwt.verify(tokenCookie, process.env.SECRET);
    req.user = await jwt.decode(tokenCookie, process.env.SECRET);

    next();
  }catch (error) {
    error.status = 401;
    error.message = 'You are not authorized. Please login';
    next(error);
  }
}

module.exports = isAuth;
