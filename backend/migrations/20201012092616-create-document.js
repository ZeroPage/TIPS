'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('document', {
      document_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      board_id: {
        allowNull: false,
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('document');
  }
};
