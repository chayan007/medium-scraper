// ```
// Handle all Database level queries.
// ```
const mongoose = require('mongoose');
const mongoConfig = require('../config/database')

const Link = require('../models/link')

mongoose.connect(
    mongoConfig.MongoURL,
    { useNewUrlParser: true, useCreateIndex: true, },
    function(error){
        if(error) throw error
        console.log('Database Connected at: ', mongoConfig.MongoURL);
});

const getParams = function (URLString) {
    const url = new URL(URLString);
    return new URLSearchParams(url.search)
}

const storeURL = function (url, callback) {
    Link.create({
        url: url,
        totalRef: 1,
    })
}
