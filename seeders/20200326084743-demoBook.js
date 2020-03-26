'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
      {
        title: 'Harry Potter and the Order of the Phoenix',
        author: 'J. K. Rowling',
        year: 2003,
        stock: 5,
        harga: 7000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Origin',
        author: 'Dan Brown',
        year: 2017,
        stock: 10,
        harga: 5000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'After You',
        author: 'Jojo Moyes',
        year: 2015,
        stock: 5,
        harga: 5000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Kamus Perancis Indonesia',
        author: 'Winarsih Arifin',
        year: 2003,
        stock: 3,
        harga: 5000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
