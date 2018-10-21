const dbConnection = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const config = require('./config');
dbConnection.set('useCreateIndex', true);
dbConnection.Promise = require('bluebird');

autoIncrement.initialize(dbConnection.connection);

module.exports = dbConnection.connect(config.database.url, {useNewUrlParser: true});
