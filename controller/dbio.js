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

const validateAndPush = function (url, callback) {
    let onlyURL = url;
    if (url.indexOf("?") > -1){
        onlyURL = url.substr(0,url.indexOf("?"));
    }
    Link.exists({url: onlyURL}, function (error, result) {
        if (error) {
            console.log(error)
        } else {
            const urlParams = getParams(url);
            if (result) {
                // If URL exists, then check if the params also exist in that list.
                Link.findOne({url: onlyURL}, function(err, linkObj) {
                    urlParams.forEach(function (value, param) {
                        if (!linkObj.parameters.includes(param)) {
                            linkObj.parameters.push(param);
                            linkObj.totalRef += 1;
                            linkObj.save();
                        }
                    });
                });
            } else {
                // If URL does not exist, then add the URL and params (if present)
                Link.create({ url: onlyURL }, function (error, newLink) {
                    if (error) {
                        console.log(error)
                    }
                    try {
                        urlParams.forEach(function (value, param) {
                            if (!newLink.parameters.includes(param)) {
                                newLink.parameters.push(param);
                                newLink.totalRef += 1;
                                newLink.save();
                            }
                        });
                    } catch (e) {
                        console.log(e);
                    }
                });
            }
        }
    })
}

module.exports = {
    validateAndPush: validateAndPush
};
