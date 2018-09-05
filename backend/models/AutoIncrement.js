const mongoose                  = require('mongoose');
const {Schema}                  = mongoose;

const schema = new Schema({
    indexId: Number,
    tableName: String
});

schema.statics.setIncrement = function (tableName) {
    return new Promise((resolve, reject) => {
        this.collection.findAndModify(
            {tableName: tableName}, [],
            {$inc: {indexId: 1}}, {"new": true, upsert: true},
            function (err, indexId) {
                if (err) {
                    reject(err);
                }
                resolve(indexId.value.indexId);
            });
    });
};

module.exports = mongoose.model('AutoIncrement', schema);