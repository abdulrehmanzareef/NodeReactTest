'use strict';

const express = require('express');
const ParentController = require('./controller');
const router = express.Router();
const ParentMiddleware = ('./middleware');
const { ValidateResults } = require('../common/validationResultMiddleware');

router.post('/login', (req, res, next) => {
  res.json({ success: true, token: "SOME_RENDOM_TOKEN" });
});

router.post('/signup', (req, res, next) => {
  ParentMiddleware.ValidateCreateParentRequest,
  ValidateResults,
  ParentController.signup
});
module.exports = router;