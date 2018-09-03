const AutoIncrement             = require('../AutoIncrement');


module.exports = function (data) {
    return new Promise((resolve, reject) => {
        let Model = this;

        AutoIncrement.setIncrement(Model.modelName)
            .then((indexId) => {
                data['id'] = indexId;
                let instance = new Model(data);

                instance.save((error, responseData) => {
                    if(error) {
                        reject(error);
                    }
                    resolve(responseData);
                });
            });

    })
};