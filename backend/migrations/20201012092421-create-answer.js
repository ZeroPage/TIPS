'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('answer', {
      answer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      member_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      problem_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      reference: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('answer');
  }
};
