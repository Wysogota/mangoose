require('dotenv').config();
const http = require('http');
require('./mongoose');
const app = require('./app');
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log('Server started on port = ' + PORT));
