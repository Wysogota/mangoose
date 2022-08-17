const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const AdminJSMongoose = require('@adminjs/mongoose');
const sequelize = require('./models');
const { MangaLists, RecommendationList } = require('./models/mongo');
const { checkAccess } = require('./functions/adminPanel.fn');
const { PERMISSION: { ADMIN_PANEL, EDIT, DELETE, CREATE, SHOW, RECOMMENDATION } } = require('./constants');
const { User, Role } = sequelize;

const resourcesConfig = (Model, permissions = {
  edit: [EDIT], del: [DELETE], create: [CREATE], show: [SHOW]
}) => {
  const { edit, del, create, show } = permissions;

  return {
    resource: Model,
    options: {
      actions: {
        edit: { isAccessible: ({ currentAdmin }) => checkAccess(currentAdmin, edit) },
        delete: { isAccessible: ({ currentAdmin }) => checkAccess(currentAdmin, del) },
        new: { isAccessible: ({ currentAdmin }) => checkAccess(currentAdmin, create) },
        show: { isAccessible: ({ currentAdmin }) => checkAccess(currentAdmin, show) }
      }
    },
  };
};

AdminJS.registerAdapter(AdminJSSequelize);
AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  resources: [
    resourcesConfig(MangaLists),
    resourcesConfig(RecommendationList, {
      edit: [RECOMMENDATION], del: [RECOMMENDATION],
      create: [RECOMMENDATION], show: [RECOMMENDATION]
    }),
    ...Object.values(sequelize.sequelize.models).map((Model) => resourcesConfig(Model)),
  ],
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
