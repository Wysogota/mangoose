const AdminJS = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
const AdminJSMongoose = require('@adminjs/mongoose');
const sequelize = require('../models');
const { MangaLists, RecommendationList } = require('../models/mongo');
const { checkAccess } = require('../functions/adminPanel.fn');
const { PERMISSION: { EDIT, DELETE, CREATE, SHOW, RECOMMENDATION } } = require('../constants');

AdminJS.registerAdapter(AdminJSSequelize);
AdminJS.registerAdapter(AdminJSMongoose);

const configurateResources = (Model, permissions = {
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

const resources = [
  configurateResources(MangaLists),
  configurateResources(RecommendationList, {
    edit: [RECOMMENDATION], del: [RECOMMENDATION],
    create: [RECOMMENDATION], show: [RECOMMENDATION]
  }),
  ...Object.values(sequelize.sequelize.models).map((Model) => configurateResources(Model)),
];

exports.localConfig = {
  resources,
  rootPath: '/admin',
};

exports.firebaseConfig = {
  resources,
  rootPath: '/',
  loginPath: '/login',
  logoutPath: '/logout',
};