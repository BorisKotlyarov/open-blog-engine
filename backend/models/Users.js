const mongoose                  = require('mongoose');
const crypto                    = require('crypto');
const insert                    = require('./AutoIncrement');
const Sessions                  = require('./Sessions');
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

schema.statics.bySessionToken = function (token) {
    let Model = this;

    return Sessions.byToken(token).then((session) => {
        return new Promise((resolve, reject) => {
            if (!session) {
                resolve(session);
            }

            Model.findOne({id: session.user_id}, (error, user) => {
                if (error) {
                    reject(error);
                }
                resolve(user);
            });
        })
    });
};

module.exports = mongoose.model('Users', schema);
