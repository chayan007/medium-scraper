const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    url: {
        type: String,
        unique: true
    },
    totalRef: {
        type: Number
    },
    param: [{
        type: String
    }]
});

const Link = module.exports = mongoose.model('Link', linkSchema);

module.exports.getByURL = function (url, callback) {
    let query = { url: url }
    Link.find(query, callback)
}
