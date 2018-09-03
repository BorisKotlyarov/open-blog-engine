const { Modules, Server }       = require('just-rest');
const config                    = require('./config');
const databaseCon               = require('./dbConnection');

Modules.defineResponseInterceptor('./interceptors/corsAllowHeaders.js');
Modules.define('./modules/categories/index.js');
Modules.define('./modules/authorize/index.js');


databaseCon.then((dbConnection)=>{
    console.log('Database connection is Successfully.');
    new Server({Modules, port:config.server.port });
}).catch((error) => {
    console.log("Database connection is fail.", error);
});


