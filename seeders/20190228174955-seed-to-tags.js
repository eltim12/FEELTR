'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Tags', [{
      name: 'Nature',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'Architecture',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'Landscape',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'Food',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: 'Animal',
      createdAt: new Date,
      updatedAt: new Date
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Tags', null, {});

  }
};
