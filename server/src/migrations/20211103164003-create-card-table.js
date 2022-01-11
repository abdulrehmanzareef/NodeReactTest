"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Card', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      securityCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expirationDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      monthlyLimit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ChildId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Card');
  },
};
