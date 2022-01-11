'use strict';

const express = require('express');
const router  = express.Router();
const parentRoutes = require('./parent/router');
const childRoutes = require('./child/router');
const cardRoutes = require('./card/router');

router.use('/api/parents', express.json(), parentRoutes);
router.use('/api/children', express.json(), childRoutes);
router.use('/api/cards', express.json(), cardRoutes);

module.exports = router;