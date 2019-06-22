const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const isAdmin = async (req, res, next) => {
    try {
     req.user.role === 'School' ? next() : res.status(401).json({msg: 'You are not authorized'});
    }catch(error) {
      next(error);
    }
  }

module.exports = isAdmin;
