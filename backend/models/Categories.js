const mongoose                  = require('mongoose');
const insert                    = require('./helpers/insert');
const {Schema}                  = mongoose;


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

schema.statics.insert = insert;

module.exports = mongoose.model('Categories', schema);
