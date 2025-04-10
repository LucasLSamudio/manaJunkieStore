'use strict';
const bcrypt= require("bcrypt")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
        firstName : "Admin",
        surname: "user",
        email:"mjs@mjs.com",
        password: bcrypt.hashSync("123",10),
        idRol: 1,
        phone:null,
        avatar: 'defaultAvatar.jpg',
        validate: true,
        lock: false,
        token: null,
        createdAt : new Date,
        updatedAt : new Date
      },
      {
        firstName : "User",
        surname: "manaJunkieStore",
        email:"user@gmail.com",
        password: bcrypt.hashSync("123",10),
        idRol: 2,
        phone:null,
        avatar: 'defaultAvatar.jpg',
        validate: true,
        lock: false,
        token: null,
        createdAt : new Date,
        updatedAt : new Date
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Users', null, {});
  
  }
};
