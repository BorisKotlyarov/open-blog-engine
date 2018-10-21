const CategoriesModel = require('../../models/Categories');


module.exports = {

    GET: {
        '/categories': async function (request, response) {
            let categories = await CategoriesModel.find({});
            response.resp(categories);
        }
    }

};
