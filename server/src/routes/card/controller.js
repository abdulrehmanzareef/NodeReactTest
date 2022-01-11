'use strict';
const { Card } = require('../../models');

const CardController = {
  createCard: async (req, res, next) => {
    try {
      const {
        type,
        number,
        securityCode,
        expirationDate,
        monthlyLimit,
        childId: ChildId
      } = req.body

      const card = await Card.create({
        type,
        number,
        securityCode,
        expirationDate,
        monthlyLimit,
        ChildId
      });


      return res.json({ success: true, card });
    } catch(error) {
      console.error(error);
      next(error);
    }
  },
  
  updateCard: async (req, res, next) => {
    try {
      const monthlyLimit = req.body.monthlyLimit;
      const cardId = req.params.cardId;

      const card = await Card.findByPk(cardId);

      if (!card) {
        return res.status(404).json({ success: false, message: 'unable to find card' });
      }

      card.monthlyLimit = monthlyLimit;
      await card.save();

      return res.json({ success: true, message: 'card updated successfully.' });
    } catch(error) {
      next(error);
    }
  },

  deleteCard: async (req, res, next) => {
    const cardId = req.params.cardId;
    const card = await Card.findByPk(cardId);

    if (!card) {
      return res.status(404).json({ success: false, message: 'unable to find card' });
    }

    await card.destroy();
    return res.json({ success: true, message: 'card has been deleted successfully.' });

  }
}

module.exports = CardController;