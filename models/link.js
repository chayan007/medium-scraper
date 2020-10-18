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

module.exports = mongoose.model('Link', linkSchema);
