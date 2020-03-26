'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Book extends Model {
  }

  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    year: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    harga: DataTypes.INTEGER
  }, { sequelize });

  Book.associate = function (models) {
    // associations can be defined here
  };
  return Book;
};