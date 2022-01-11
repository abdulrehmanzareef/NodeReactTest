'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Parent', [{
      email: 'example@example.com',
      passwordHash: "SOME_PASSWORD_HASH",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Parent', null, {});
  }
};