'use strict';

const fs         = require('fs');
const path       = require('path');
const Sequelize  = require('sequelize');
const basename   = path.basename(module.filename);
const config     = require('../../config/database.json')[process.env.NODE_ENV];

const sequelize = new Sequelize (config);

const db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;