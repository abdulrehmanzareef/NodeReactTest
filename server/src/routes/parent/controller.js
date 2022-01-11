'use strict';
const { Parent } = require('../../models');

const ParentController = {
  signup: async (req, res, next) => {
    try {
      const {
        email,
        password
      } = req.body;
    } catch(error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = ParentController;