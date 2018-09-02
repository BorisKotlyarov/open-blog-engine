const mongoose                  = require('mongoose');
const insert                    = require('./helpers/insert');
const {Schema}                  = mongoose;


const schema = new Schema({
    id: Number,

    token: String,

    user_id: {
        type: Number,
        ref: 'Sessions',
        foreignField: 'id'
    },

});

schema.statics.insert = function (userId, callback) {
    let Model = this;
    let data = {
        user_id: userId
    };

    AutoIncrement.setIncrement(Model.modelName, function (err, index){

        data['id'] = index;
        data['token'] = crypto.createHash('md5').update(`${userId}:${new Date().getTime()}`).digest("hex");

        let instance = new Model(data);

        instance.save((error, responseData) => {
            callback(...arguments);
        });

    });
};

schema.statics.byToken = function (token) {
    return new Promise((resolve, reject) => {
        this.findOne({token}, (error, session) => {
            if (error) {
                reject(error);
            }
            resolve(session);
        });
    });
};

module.exports = mongoose.model('Sessions', schema);
