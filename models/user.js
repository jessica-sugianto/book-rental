'use strict';
module.exports = (sequelize, DataTypes) => {


  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {
  }

  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_date: DataTypes.DATEONLY,
    address: DataTypes.STRING,
    noktp: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, { sequelize });

  User.associate = function (models) {
    User.belongsToMany(models.Book, { through: models.Transaction })
    User.hasMany(models.Transaction)
  };
  return User;
};