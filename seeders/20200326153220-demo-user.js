'use strict';
const Pass = require('../helpers/password')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            first_name: 'admin',
            last_name: 'admin',
            phone_number: '082134567890',
            birth_date: new Date(),
            address: 'Praja 20',
            noktp: 300123043,
            username: 'admin',
            password: Pass.hashPassword('admin'),
            role: 'Admin',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
        */
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
        */
    }
};