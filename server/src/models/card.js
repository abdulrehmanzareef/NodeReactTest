'use strict';

module.exports = (sequelize, DataTypes) => {
  let Card = sequelize.define('Card', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    securityCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expirationDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monthlyLimit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ChildId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Child',
        key: 'id'
      },
      allowNull: false,
    }
  }, {
    freezeTableName: true
  });

  Card.associate = function(models) {
    Card.belongsTo(models.Child);
  }
  return Card;
}