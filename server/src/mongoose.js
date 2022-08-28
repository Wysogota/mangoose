const mongoose = require('mongoose');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, './config/mongoConfig.json');
const config = require(configPath)[mode];

let connectingUrl;
if (config.use_env_variable) {
  connectingUrl = process.env[config.use_env_variable];
} else {
  connectingUrl = `mongodb://${config.host}:${config.port}/${config.database}`;
}

mongoose.connect(connectingUrl, { retryWrites: true, w: 'majority' }, (err) => {
  if (err) throw err;
});

module.exports = mongoose;