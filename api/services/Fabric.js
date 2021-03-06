var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    status: String
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Fabric', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    getEnabledFabrics: function (data, callback) {
        Fabric.find({
            status: 'Enabled'
        }).exec(function (err, data) {
            if (err) {
                callback(err, null);
            } else if (data) {
                callback(null, data);
            } else {
                callback({
                    message: "Invalid credentials"
                }, null);
            }
        });
    }
};
module.exports = _.assign(module.exports, exports, model);