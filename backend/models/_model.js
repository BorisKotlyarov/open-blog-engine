const autoIncrement = require('mongoose-auto-increment');

let methods = {
    create: function (data) {
        let Model = this;
        let instance = new Model(data);
        return instance.save();
    }
};

module.exports = function (modelName, schema) {

    schema.plugin(autoIncrement.plugin, {
        model: modelName,
        startAt: 1,
    });

    Object.keys(methods).forEach((name) => {
        schema.statics[name] = methods[name];
    });
};
