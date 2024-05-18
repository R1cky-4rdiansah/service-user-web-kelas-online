"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Ricky",
          profession: "Full Stack Developer",
          role: "admin",
          email: "r1cky.fullstackdev@gmail.com",
          password: await bcrypt.hash("123123123", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Gery",
          profession: "Full Stack Developer",
          role: "student",
          email: "gery.fullstackdev@gmail.com",
          password: await bcrypt.hash("123123123", 10),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
