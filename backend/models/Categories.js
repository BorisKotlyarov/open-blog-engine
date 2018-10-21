const mongoose = require('mongoose');
const _defineDefaultMethods = require('./_model');

const {Schema} = mongoose;

const __MODEL_NAME__ = 'Categories';

const schema = new Schema({
    id: Number,

    name: {
        type: String,
        required: true
    },

    description: String,

    parent_id: {
        type: Number,
        ref: 'Categories',
        foreignField: 'id'
    },

});

_defineDefaultMethods(__MODEL_NAME__, schema);

module.exports = mongoose.model(__MODEL_NAME__, schema);
