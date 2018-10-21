module.exports = {

    ANY: {
        '/(.+?)': function(request, response){
            const CorsAllowHeaders = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Set-Cookies',
                'Software':'Just-Rest'
            };

            Object.keys(CorsAllowHeaders).forEach((item) => {
                response.setHeader(item, CorsAllowHeaders[item]);
            });
        }
    }

};