const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const AdminJSMongoose = require('@adminjs/mongoose');
const sequelize = require('./models');
const mongoose = require('mongoose');
require('./models/mongo/MangaLists');
const { checkAccess } = require('./functions/adminPanel.fn');
const { PERMISSION: { ADMIN_PANEL } } = require('./constants');

const { User, Role } = sequelize;

AdminJS.registerAdapter(AdminJSSequelize);
AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  databases: [mongoose, sequelize],
  resources: [{
    resource: User,
    options: {
      actions: {
        edit: {
          isAccessible: ({ currentAdmin }) => checkAccess(currentAdmin, ADMIN_PANEL)
        },
      }
    },
  }],
  rootPath: '/admin',
});

module.exports = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (user && await user.comparePassword(password)) {
      const role = await Role.findOne({ where: { id: user.roleId } });
      const permissions = await role.getPermissions({ attributes: ['name'] });

      const currentUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        permissions: permissions.map((perm) => perm.name),
      };

      const hasAccess = checkAccess(currentUser, ADMIN_PANEL);
      return hasAccess ? currentUser : null;
    }
    return null;
  },
  cookieName: 'adminjs',
  cookiePassword: 'somepassword',
}, null, {
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET ?? 'sessionsecret',
}
);
