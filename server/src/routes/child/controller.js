'use strict';
const { Child, Card } = require('../../models');

const ChildController = {
  createChild: async (req, res, next) => {
    try {
      const {
        name,
        age
      } = req.body

      const ParentId = req.ParentId;
      const child = await Child.create({
        name,
        age,
        ParentId
      });

      return res.json({ success: true, child });
    } catch(error) {
      console.error(error);
      next(error);
    }
  },
  
  updateChild: async (req, res, next) => {
    try {
      const {
        age,
        name
      } = req.body;

      const childId = req.params.childId;

      const child = await Child.findByPk(childId);

      if (!child) {
        return res.status(404).json({ success: false, message: 'unable to find child' });
      }

      if (age) {
        child.age = age;
      }

      if (name) {
        child.name = name;
      }

      await child.save();

      return res.json({ success: true, message: 'child updated successfully.' });
    } catch(error) {
      next(error);
    }
  },

  deleteChild: async (req, res, next) => {
    const childId = req.params.childId;
    const ParentId = req.ParentId;

    const child = await Child.findByPk(childId);

    if (!child) {
      return res.status(404).json({ success: false, message: 'unable to find child' });
    }

    if (child.ParentId !== ParentId) {
      return res.status(403).json({ success: false, message: 'unauthorized for this operation' });
    }

    await child.destroy();
    return res.json({ success: true, message: 'child has been deleted successfully.' });
  },

  getAllChildren: async (req, res, next) => {
    try {
      const ParentId = req.ParentId;
      const childrenContext = { where: { ParentId } };

      const children = await Child.findAll(childrenContext);
      return res.json({ success: true, children });
    } catch(error) {
      next(error);
    }
  },
  
    getSingleChildren: async (req, res, next) => {
      const ChildId = req.params.childId;
      const children = await Child.findOne({
        where: {
          id: ChildId
        }
      });
  
      return res.json({ success: true, children });
    },

  getAllChildrenCards: async (req, res, next) => {
    const ChildId = req.params.childId;
    const ParentId = req.ParentId;

    const children = await Child.findOne({
      where: {
        ParentId,
        id: ChildId
      },
      include: [{
        model: Card
      }]
    });

    const cards = children && children.Cards ? children.Cards : [];
    return res.json({ success: true, cards });
  }
}

module.exports = ChildController;