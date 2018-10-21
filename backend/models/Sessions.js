const mongoose = require('mongoose');
const crypto = require('crypto');
const _defineDefaultMethods = require('./_model');

const {Schema} = mongoose;

const __MODEL_NAME__ = 'Sessions';

const schema = new Schema({
    id: Number,

    token: String,

    user: {
        type: Number,
        ref: 'Users'
    },

    state: {
        type: String,
        enum: ['open', 'close'],
        default: 'open'
    },

});

_defineDefaultMethods(__MODEL_NAME__, schema);

schema.statics.createToken = function (userId) {
    return crypto.createHash('md5').update(`${userId}:${new Date().getTime()}`).digest("hex");
}

schema.statics.create = function (userId) {
    let Model = this;
    console.log(userId)
    let data = {
        user: userId,
        token: this.createToken(userId)
    };

    let instance = new Model(data);
    return instance.save();
};

schema.statics.close = async function (token) {

    let session = await this.findOne({token});

    if (!session) {
        return null;
    }

    session.state = 'close';
    return session.save();
};

module.exports = mongoose.model(__MODEL_NAME__, schema);
