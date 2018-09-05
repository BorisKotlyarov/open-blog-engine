const mongoose                  = require('mongoose');
const AutoIncrement             = require('../AutoIncrement');
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

schema.statics.insert = function (userId) {
    let Model = this;
    let data = {};

    AutoIncrement.setIncrement(Model.modelName)
        .then((indexId) => {
            data['id'] = indexId;
            data['token'] = crypto.createHash('md5').update(`${userId}:${new Date().getTime()}`).digest("hex");
            data['user_id'] = userId;

            let instance = new Model(data);
            instance.save((error) => {
                if(error) {
                    throw error;
                }
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

schema.statics.close = function (token) {

    return new Promise((resolve, reject) => {
        this.findOne({token}, (error, session) => {
            if (error) {
                reject(error);
            }

            if (null !== session) {
                session.state = 'close';
                session.save();
            }

            resolve(session);
        });
    });
};

module.exports = mongoose.model('Sessions', schema);
