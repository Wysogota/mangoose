const fs = require('fs');
require('dotenv').config();
const AdminJS = require('adminjs');
const adminJsOptions = require('../admin/config');

const admin = new AdminJS(adminJsOptions);

fs.copyFile(
  './node_modules/adminjs/lib/frontend/assets/scripts/app-bundle.production.js',
  './public/app.bundle.js',
  (err) => { if (err) throw err; },
);
fs.copyFile(
  './node_modules/adminjs/lib/frontend/assets/scripts/global-bundle.production.js',
  './public/global.bundle.js',
  (err) => { if (err) throw err; },
);
admin.initialize().then(() => {
  fs.rename(
    './.adminjs/bundle.js',
    './public/components.bundle.js',
    (err) => { if (err) throw err; },
  );
});
