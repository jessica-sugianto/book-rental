'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Book extends Model {
  }

  Book.init({
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Title tidak boleh kosong'
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Author tidak boleh kosong'
        }
      }
    },
    year: {
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Year tidak boleh kosong'
        }
      }
    },
    stock: {
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Stock tidak boleh kosong'
        }
      }
    },
    harga: {
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Price tidak boleh kosong'
        }
      }
    },
    pathImage: DataTypes.STRING,
    readyStock: DataTypes.INTEGER
  }, { sequelize });

  Book.associate = function (models) {
    Book.belongsToMany(models.User, { through: models.Transaction })
    Book.hasMany(models.Transaction)
  };
  return Book;
};