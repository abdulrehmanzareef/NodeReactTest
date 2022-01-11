const { validationResult } = require('express-validator');

exports.ValidateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch (e) {
    if (e.mapped()._error && e.mapped()._error.nestedErrors) {
      res.status(400).json({ success: false, errors: e.mapped()._error.nestedErrors });
    } else {
      res.status(400).json({ success: false, errors: e.mapped() });
    }
  }
};