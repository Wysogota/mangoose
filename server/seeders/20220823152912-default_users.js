'use strict';
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  return await bcrypt.hash(password, saltRounds);
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        role_id: 1,
        username: 'admin',
        email: 'admin@mangoose.com',
        password_hash: await hashPassword('password'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
