'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Transaction extends Model {
  }

  Transaction.init({
    UserId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER,
    borrow_date: DataTypes.DATEONLY,
    duration: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER
  }, { sequelize });

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Book)
    Transaction.belongsTo(models.User)
  };
  return Transaction;
};