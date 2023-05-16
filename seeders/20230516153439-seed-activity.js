'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let acitivityData = require('../data/activity-data.json')
    acitivityData.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('activities', acitivityData)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('activities', null, {})
  }
};
