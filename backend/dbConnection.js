const dbConnection              = require('mongoose');
const config                    = require('./config.js');


module.exports = dbConnection.connect(config.database.url, { useNewUrlParser: true });
