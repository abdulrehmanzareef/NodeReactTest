'use strict';

const express = require('express');
const ChildController = require('./controller');
const Router = express.Router();
const ChildMiddleware = require('./middleware');
const { ValidateResults } = require('../common/validationResultMiddleware');

Router.post('/', 
  ChildMiddleware.ValidateCreateChildRequest,
  ValidateResults,
  ChildController.createChild
);

Router.put('/:childId', 
  ChildMiddleware.ValidateUpdateChildRequest,
  ValidateResults,
  ChildController.updateChild
);

Router.delete('/:childId', 
  ChildMiddleware.ValidatedeleteChildRequest,
  ValidateResults,
  ChildController.deleteChild
);

Router.get('/',
  ChildMiddleware.ValidateGetAllChildrenRequest,
  ValidateResults,
  ChildController.getAllChildren
);

Router.get('/:childId/cards',
  ChildMiddleware.ValidateGetAllChildCardsRequest,
  ValidateResults,
  ChildController.getAllChildrenCards
);

Router.get('/:childId',
  ChildMiddleware.ValidateGetSingleChildRequest,
  ValidateResults,
  ChildController.getSingleChildren
);
module.exports = Router;