'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('problems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      problem_id: {
        type: Sequelize.BIGINT
      },
      category_id: {
        type: Sequelize.BIGINT
      },
      member_id: {
        type: Sequelize.BIGINT
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      time_limit: {
        type: Sequelize.INTEGER
      },
      reference: {
        type: Sequelize.TEXT
      },
      created: {
        type: Sequelize.DATE
      },
      good_vote: {
        type: Sequelize.BIGINT
      },
      bad_vote: {
        type: Sequelize.BIGINT
      },
      hard_vote: {
        type: Sequelize.BIGINT
      },
      easy_vote: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('problems');
  }
};