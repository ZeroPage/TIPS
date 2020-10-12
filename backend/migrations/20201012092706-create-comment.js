'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment_id: {
        type: Sequelize.BIGINT
      },
      parent_id: {
        type: Sequelize.BIGINT
      },
      member_id: {
        type: Sequelize.BIGINT
      },
      problem_id: {
        type: Sequelize.BIGINT
      },
      answer_id: {
        type: Sequelize.BIGINT
      },
      document_id: {
        type: Sequelize.BIGINT
      },
      content: {
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
    await queryInterface.dropTable('comments');
  }
};