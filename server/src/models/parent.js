'use strict';

module.exports = (sequelize, DataTypes) => {
  let Parent = sequelize.define('Parent', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  Parent.associate = function(models) {
    Parent.hasMany(models.Child);
  }

  return Parent;
};