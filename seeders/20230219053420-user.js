'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: "Laquinta",
        lastName: "Williams",
        email: "test@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        firstName: "Steph",
        lastName: "Curry",
        email: "curry@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        firstName: "April",
        lastName: "Hawthorne",
        email: "april@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        firstName: "Matt",
        lastName: "Fisher",
        email: "test4@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date() 
      }
    ], {});
},

down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('Users', null, {});
}
};
