const { Modules, Server }       = require('just-rest');
const config                    = require('./config');
const databaseCon               = require('./dbConnection');

databaseCon.then((dbConnection)=>{
    console.log('Database connection is Successfully.');
    Modules.defineRequestInterceptor('./interceptors/request/session.js');
    Modules.defineResponseInterceptor('./interceptors/corsAllowHeaders.js');
    Modules.define('./modules/categories/index.js');
    Modules.define('./modules/authorize/index.js');
    Modules.define('./modules/users/index.js');

    new Server({Modules, port:config.server.port });
}).catch((error) => {
    console.log("Database connection is fail.", error);
});


