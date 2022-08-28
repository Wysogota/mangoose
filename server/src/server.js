require('dotenv').config();
require('./mongoose');
const app = require('./app');
const { inveromentAction } = require('./functions/deployment.fn');

const localAction = () => {
  require('dotenv').config({ path: './build/.env.local' });
  const http = require('http');
  const server = http.createServer(app);
  const PORT = process.env.PORT || 80;

  server.listen(PORT, () => console.log('Server started on port = ' + PORT));
};

const firebaseAction = () => {
  const functions = require('firebase-functions');
  const admin = require('./admin');

  exports.app = functions.https.onRequest(app);
  exports.admin = functions.https.onRequest(admin);
};

inveromentAction({
  local: {
    action: localAction,
  },
  firebase: {
    action: firebaseAction,
  }
});
