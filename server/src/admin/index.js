const sequelize = require('../models');
const { checkAccess } = require('../functions/adminPanel.fn');
const { inveromentAction } = require('../functions/deployment.fn');
const { PERMISSION: { ADMIN_PANEL } } = require('../constants');
const { User, Role } = sequelize;

const secret = process.env.SESSION_SECRET ?? 'sessionsecret';

const authenticate = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (user && await user.comparePassword(password)) {
    const permissions = await Role.getUserPermissions(user.roleId);

    const currentUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      permissions,
    };

    const hasAccess = checkAccess(currentUser, ADMIN_PANEL);
    return hasAccess ? currentUser : null;
  }
  return null;
};


const firebaseAction = () => {
  const { firebaseConfig } = require('./config');
  const { buildHandler } = require('@adminjs/firebase-functions');
  module.exports = buildHandler(firebaseConfig, {
    region: 'us-central1',
    auth: {
      secret,
      authenticate,
    },
  });
};

const localAction = () => {
  const AdminJS = require('adminjs');
  const { buildAuthenticatedRouter } = require('@adminjs/express');
  const { localConfig } = require('./config');
  const adminJs = new AdminJS(localConfig);

  module.exports = buildAuthenticatedRouter(adminJs, {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: 'somepassword',
  }, null, {
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET ?? 'sessionsecret',
  }
  );
};

inveromentAction({
  local: {
    action: localAction,
  },
  firebase: {
    action: firebaseAction,
  }
});


// const adminJs = new AdminJS(adminJsOptions);
// AdminJSExpress.buildAuthenticatedRouter(adminJs, {
//   authenticate: async (email, password) => {
//     const user = await User.findOne({ where: { email } });
//     if (user && await user.comparePassword(password)) {
//       const permissions = await Role.getUserPermissions(user.roleId);

//       const currentUser = {
//         id: user.id,
//         username: user.username,
//         email: user.email,
//         permissions,
//       };

//       const hasAccess = checkAccess(currentUser, ADMIN_PANEL);
//       return hasAccess ? currentUser : null;
//     }
//     return null;
//   },
//   cookieName: 'adminjs',
//   cookiePassword: 'somepassword',
// }, null, {
//   resave: true,
//   saveUninitialized: true,
//   secret: process.env.SESSION_SECRET ?? 'sessionsecret',
// }
// );
