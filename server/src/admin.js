const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const AdminJSMongoose = require('@adminjs/mongoose');
const sequelize = require('./models');
const mongoose = require('mongoose');
require('./models/mongo/MangaLists');

AdminJS.registerAdapter(AdminJSSequelize);
AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  databases: [mongoose, sequelize],
  rootPath: '/admin',
});

module.exports = AdminJSExpress.buildRouter(adminJs);

