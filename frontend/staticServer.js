const http              = require('http');
const url               = require('url');
const querystring       = require('querystring');
const static            = require('node-static');
const PORT              = process.env.PORT || 8080;

let file = new static.Server('./dist', { cache: 0 });


function accept(request, response) {
    console.log(request.url);

    request.addListener('end', function () {
        file.serve(request, response, function (e, res) {
            if (e && (e.status === 404)) {
                file.serveFile('/index.html', 200, {}, request, response);
            }
        });
    }).resume();
}

http.createServer(accept).listen(PORT);
console.log(`server listening on http://localhost:${PORT}, Ctrl+C to stop`);