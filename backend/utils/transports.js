const http                    = require('http');
const https                   = require('https');
const uri                     = require('url');


class HttpRequest {

    static request({ url = '', method = 'GET', postBody = '', headers = {} } = {}){

        if(postBody) {
            headers['Content-Length'] = Buffer.byteLength(postBody);
        }

        return new Promise((resolve, reject) => {
            let response = {
                body: '',
                headers: {}
            };
            let urlInformation = uri.parse(url);
            let transport = urlInformation.protocol == 'https:' ? https : http;

            if(urlInformation.port === null){
                if(urlInformation.protocol == 'https:'){
                    urlInformation.port = 443;
                } else {
                    urlInformation.port = 80;
                }
            }

            let options = {
                hostname: urlInformation.hostname,
                port    : urlInformation.port,
                path    : urlInformation.path,
                method  : method,
                headers : headers
            };

            let responseHeaders = {};
            let req = transport.request(options, res => {
                response.headers = res.headers;

                res.setEncoding('utf8');

                res.on('data', data => {
                    response.body += data;
                } )
                    .on('end', () => resolve(response) );
            });

            req.on('error', error => reject(error) );

            req.end(postBody);
        });
    }

    static get(){
        return this.request(...arguments);
    }

    static post(options = {}){
        options.method = 'POST';
        options.postBody = options.postBody ? options.postBody:'';
        return this.request(options);
    }
}


module.exports = HttpRequest;