'use strict';

module.exports = (sequelize, DataTypes) => {
  let Child = sequelize.define('Child', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ParentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Parent',
        key: 'id'
      },
      allowNull: false,
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

  Child.associate = function(models) {
    Child.hasMany(models.Card);
    Child.belongsTo(models.Parent);
  }

  return Child;
};