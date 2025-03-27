'use strict';

const productsJSON = require('../../db/products.json');
const images = productsJSON.map(({image}, index) => {
  return {
    name: image,
    idProduct : index + 1,
    createdAt : new Date,
    updatedAt : new Date
  }
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('ImageProducts', images, {});

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('ImageProducts', null, {});
  
  }
};
