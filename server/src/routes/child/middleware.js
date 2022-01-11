const { check } = require('express-validator');

exports.ValidateCreateChildRequest = [
  check('age')
    .exists()
    .isInt(),
  check('name')
    .exists()
    .isString()
];

exports.ValidateUpdateChildRequest = [
  check('age')
    .optional()
    .isInt(),
  check('name')
    .optional()
    .isString()
];

exports.ValidateGetAllChildCardsRequest = [
  check('childId')
    .exists()
    .isInt()
];

exports.ValidateGetSingleChildRequest = [
  check('childId')
    .exists()
    .isInt()
];

exports.ValidateGetAllChildrenRequest = [];

exports.ValidatedeleteChildRequest = [
  check('childId')
    .exists()
    .isInt()
];
