const {Schema} = require('mongoose');

var schema = new Schema({
    indexId: Number,
    tableName: String
});

schema.statics.setIncrement = function (tableName, callback) {
    this.collection.findAndModify(
        {tableName: tableName}, [],
        {$inc: {indexId: 1}}, {"new": true, upsert: true},
        function (err, indexId) {
            callback(err, indexId);
        });
};

exports.AutoInc = mongoose.model('autoincrement', schema);