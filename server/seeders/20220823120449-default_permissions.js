'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', [
      {
        name: 'Admin Panel',
        description: 'Access to admin panel',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Edit',
        description: 'Edit data tables',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Delete',
        description: 'Delete data tables',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Create',
        description: 'Create data tables',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Show',
        description: 'Show data tables',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Recommendation',
        description: 'Manage recommendations on Home page',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
