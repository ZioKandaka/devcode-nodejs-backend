'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let todoData = require('../data/todo-data.json')
    todoData.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('todos', todoData)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('todos', null, {})
  }
};
