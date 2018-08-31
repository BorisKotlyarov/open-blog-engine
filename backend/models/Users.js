const mongoose                  = require('mongoose');
const crypto                    = require('crypto');
const insert                    = require('./AutoIncrement');
const {Schema}                  = mongoose;


const schema = new Schema({
    id: Number,

    login: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

});

schema.statics.insert = function (data, callback) {
    let Model = this;

    insert.setIncrement(Model.modelName, function (err, index){

        data['id'] = index;
        data.password = crypto.createHash('md5').update(data.password).digest("hex");
        let instance = new Model(data);

        instance.save((error, responseData) => {
            callback(...arguments);
        });

    });
};

module.exports = mongoose.model('Users', schema);
