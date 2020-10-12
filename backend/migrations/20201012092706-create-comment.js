'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comment', {
      comment_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      parent_id: {
        type: Sequelize.BIGINT
      },
      member_id: {
        allowNull: false,
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
        allowNull: false,
        type: Sequelize.TEXT
      },
      created: {
        allowNull: false,
        type: Sequelize.DATE
      },
      good_vote: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      bad_vote: {
        allowNull: false,
        type: Sequelize.BIGINT
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comment');
  }
};
