'use strict';

const categories = ["Procesadores","Memoria RAM","Almacenamiento", "Periféricos", "Placas de video", "Monitores"]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Categories', categories.map(category => {
      return {
        name : category,
        createdAt : new Date,
        updatedAt : new Date
      }
    }), {});

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Categories', null, {});
  
  }
};
