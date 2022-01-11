const { check } = require('express-validator');

exports.ValidateCreateCardRequest = [
  check('type')
    .exists()
    .isString(),
  check('number')
    .exists()
    .isString(),
  check('securityCode')
    .exists()
    .isString(),
  check('expirationDate')
    .exists()
    .isString(),
  check('monthlyLimit')
    .exists()
    .isInt(),
  check('childId')
    .exists()
    .isInt()
];

exports.ValidateUpdateCardRequest = [
  check('monthlyLimit')
    .exists()
    .isInt(),
  check('cardId')
    .exists()
    .isInt()
]

exports.ValidatedeleteCardRequest = [
  check('cardId')
    .exists()
    .isInt()
];
