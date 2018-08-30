const AutoIncrement             = require('../AutoIncrement');


module.exports = function (data, callback) {
    let Model = this;

    AutoIncrement.setIncrement(Model.modelName, function (err, index){

        data['id'] = index;
        let instance = new Model(data);

        instance.save((error, responseData) => {
            callback(...arguments);
        });

    });
};