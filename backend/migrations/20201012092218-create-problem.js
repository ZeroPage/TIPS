'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('problem', {
      problem_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      category_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      member_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      time_limit: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      reference: {
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
      },
      hard_vote: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      easy_vote: {
        allowNull: false,
        type: Sequelize.BIGINT
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('problem');
  }
};
