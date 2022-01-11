
'use strict';

const express       = require('express');
const cors          = require('cors');
const bodyParser    = require('body-parser');
const router        = require('./src/routes');
const { Sequelize } = require('sequelize');
const app           = express();
const http          = require('http');
const models        = require('./src/models');
const path          = require('path');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use('/', (req, res, next) => {
  req.ParentId = 1; 
  next();
},router);

const handleFinalOutputErrorResponse = (err, req, res, next) => {
  // reboot process
  if (err instanceof Sequelize.ConnectionAcquireTimeoutError) {
    process.exit(-1);
  }

  let response = { success: false };
  let statusCode = err.status || 500;

  if(err.errorCode) {
      response.errorCode = err.errorCode;
  }
  response.error = err.message;

  // error as json
  return res.status(statusCode).json(response);
};

const handleNotImplementedError = (req, res, next) => {
  const err = new Error('Method Not Allowed');
  err.status = 405;
  next(err);
};

// error handlers
app.use(handleNotImplementedError);
app.use(handleFinalOutputErrorResponse);

const port = process.env.PORT || 4000;

app.set('port', port);
const server = http.createServer(app);

models.sequelize.sync({
  force: false
}).then(function () {
  server.listen(port);
  server.on('error', (error) => {
    console.error('Error has been occured', error);
  });
  server.on('listening', () => {
    console.log('server is listening on port: ', port);
  });
}).catch(error => {
  console.error(error.message);
});