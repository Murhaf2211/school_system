const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const isAdmin = async (req, res, next) => {
    try {
     const decodedUser = await jwt.decode(req.token, process.env.SECRET);
  
     if(decodedUser.role=='admin') next();
  
      else res.status(201).json('You are not admin');
  
    }catch(error) {
      next(error);
    }
  }

module.exports = isAdmin;