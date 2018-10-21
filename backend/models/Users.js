const crypto = require('crypto');
const mongoose = require('mongoose');
const _defineDefaultMethods = require('./_model');
const SessionsModel = require('./Sessions');

const {Schema} = mongoose;

const __MODEL_NAME__ = 'Users';

const schema = new Schema({
    id: Number,

    login: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    permissions: {
        type: [String],
        default: []
    }

});

_defineDefaultMethods(__MODEL_NAME__, schema);

schema.statics.create = function (data) {
    let Model = this;
    data.password = Model.passwordEncrypt(data.password);
    let instance = new Model(data);
    return instance.save();
};

schema.statics.bySessionToken = function (token) {
    return SessionsModel.findOne({token}).populate({
        path: 'user',
        model: __MODEL_NAME__
    });
};

schema.statics.passwordEncrypt = function (password) {
    return crypto.createHash('md5').update(password).digest("hex");
};

schema.statics.findUser = function ({login, password}) {
    return this.findOne({login, password: this.passwordEncrypt(password)});
};

module.exports = mongoose.model(__MODEL_NAME__, schema);
