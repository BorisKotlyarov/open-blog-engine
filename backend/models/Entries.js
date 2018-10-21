const mongoose = require('mongoose');
const _defineDefaultMethods = require('./_model');

const {Schema} = mongoose;

const __MODEL_NAME__ = 'Entries';

const schema = new Schema({
    id: Number,

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    pub_time: {
        type: Number,
        required: true
    },

    category_id: {
        type: Number,
        ref: 'Categories'
    },

});

_defineDefaultMethods(__MODEL_NAME__, schema);

module.exports = mongoose.model(__MODEL_NAME__, schema);
