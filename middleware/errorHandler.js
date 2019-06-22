const { validationResult } = require('express-validator/check');

const errorHandler = (err, req, res, next) => {
    err.status = err.status || 500;
    res.status(err.status).json({msg: err.message});
  }

const handeleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({errors: validationErrors.array()});// .array()
    }
    next();
  }

  module.exports = {errorHandler, handeleValidationErrors };
