'use strict';

const express = require('express');
const CardController = require('./controller');
const Router = express.Router();
const CardMiddleware = require('./middleware');
const { ValidateResults } = require('../common/validationResultMiddleware')

Router.post('/', 
  CardMiddleware.ValidateCreateCardRequest,
  ValidateResults,
  CardController.createCard
);

Router.put('/:cardId',
  CardMiddleware.ValidateUpdateCardRequest,
  ValidateResults,
  CardController.updateCard
);

Router.delete('/:cardId',
  CardMiddleware.ValidatedeleteCardRequest,
  ValidateResults,
  CardController.deleteCard
);

module.exports = Router;