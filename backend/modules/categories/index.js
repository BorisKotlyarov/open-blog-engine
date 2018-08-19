const httpRequest           = require('../../utils/transports');
const toFormat              = require('./toFormat');
const repositoryTreeUrl     = 'https://api.github.com/repos/BorisKotlyarov/open-blog-engine-database/git/trees/bbb2decbee6cecd16a6d0835bede14ec6d41d952?recursive=1';


module.exports = {

    GET: {
        '/categories': function(request, response){
            httpRequest.get({
                url: repositoryTreeUrl,
                headers: {
                    'User-Agent': 'Open Blog Engine'
                }
            })
                .then((responseData)=> {
                    try {
                        let body = toFormat(JSON.parse(responseData.body));
                        response.resp(body);
                    } catch (error){
                        response.error(400, error);
                    }
                })
                .catch((error)=> {
                    response.error(500, error);
                });
        }
    }

};
