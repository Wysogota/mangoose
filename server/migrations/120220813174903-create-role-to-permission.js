'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_to_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleId: {
        field: 'role_id',
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        }
      },
      permissionId: {
        field: 'permission_id',
        type: Sequelize.INTEGER,
        references: {
          model: 'permissions',
          key: 'id',
        }
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role_to_permissions');
  }
};