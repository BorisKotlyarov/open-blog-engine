const mongoose                  = require('mongoose');
const {Schema}                  = mongoose;
const AutoIncrement             = require('./AutoIncrement');


const schema = new Schema({
    id: Number,

    name: {
        type: String,
        required: true
    },

    description: String,

    parent_id: {
        type: Number,
        ref: 'Categories'
    },

});

schema.statics.insert = function (data, callback) {
    let Model = this;

    AutoIncrement.setIncrement('Categories', function (err, index){

        data['id'] = index;
        let instance = new Model(data);

        instance.save((error, responseData) => {
            callback(...arguments);
        });

    });
};



module.exports = mongoose.model('Categories', schema);
