const { Modules, Server }   = require('just-rest');
const config                = require('./config');


Modules.defineResponseInterceptor('./interceptors/corsAllowHeaders.js');
Modules.define('./modules/categories/index.js');

new Server({Modules, port:config.server.port });
