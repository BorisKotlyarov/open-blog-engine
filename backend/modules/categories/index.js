const httpRequest           = require('../../utils/transports');
const CategoriesModel       = require('../../models/Categories');


module.exports = {

    GET: {
        '/categories': function(request, response){

            CategoriesModel.find({}, function (error, responce) {
                if(error){
                    response.error(500, error);
                }
                response.resp(responce);
            });

        }
    }

};
