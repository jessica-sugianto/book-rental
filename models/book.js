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
    harga: DataTypes.INTEGER,
    pathImage: DataTypes.STRING,
  }, { sequelize });

  Book.associate = function (models) {
    Book.belongsToMany(models.User, { through: models.Transaction })
    Book.hasMany(models.Transaction)
  };
  return Book;
};