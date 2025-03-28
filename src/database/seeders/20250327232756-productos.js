'use strict';

const productsJSON = require('../../db/products.json');
const products = productsJSON.map(({name, price, description, category, discount}) => {
  return {
    name,
    price,
    description,
    idCategory: category,
    discount,
    createdAt : new Date,
    updatedAt : new Date
  }
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Products', products, {});

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Products', null, {});
  
  }
};
