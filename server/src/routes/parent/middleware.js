const { check } = require('express-validator');

exports.ValidateCreateParentRequest = [
  check('email')
    .exists()
    .isString()
    .isEmail(),
  check('password')
    .exists()
    .isString()
];
