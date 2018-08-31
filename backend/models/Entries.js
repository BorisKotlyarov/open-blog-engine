const mongoose                  = require('mongoose');
const insert                    = require('./helpers/insert');
const {Schema}                  = mongoose;


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

schema.statics.insert = insert;

module.exports = mongoose.model('Entries', schema);
