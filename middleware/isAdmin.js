const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const notAuthorizedMsg = 'You are not authorized';

const isAdmin = async (req, res, next) => {
    try {
     req.user.role === 'School' ? next() : res.status(401).json({msg: notAuthorizedMsg});
    }catch(error) {
      next(error);
    }
  }

const isStudent = async (req, res, next) => {
  try {
    req.user.role === 'Student' ? next() : res.status(401).json({msg: notAuthorizedMsg})
  }catch(error) {
    next(error);
  }
}

module.exports = {isAdmin, isStudent};
