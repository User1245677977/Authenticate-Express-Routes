const admin = require('firebase-admin');
const serviceAccount = require('./MIT-Auth-Routes.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<your-database-name>.firebaseio.com'
});

module.exports = admin;