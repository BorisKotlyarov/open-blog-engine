const { Modules, Server }   = require('just-rest');
const PORT = process.env.PORT || 3003;

Modules.defineResponseInterceptor('./interceptors/corsAllowHeaders.js');
Modules.define('./modules/categories/index.js');

new Server({Modules, port:PORT });
