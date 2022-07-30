const mongoose = require('mongoose');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '../config/mongoConfig.json');
const config = require(configPath)[mode];

mongoose.connect(
  `mongodb://${config.host}:${config.port}/${config.database}`,
  { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
  });

module.exports = mongoose;
