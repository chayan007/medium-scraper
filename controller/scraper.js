// ```
// Handle the scraper logic.
// ```
const Crawler = require('crawler');
const fs = require('fs');

const appConfig = require('../config/scraper')

let jsonArray = [];

let medium = new Crawler({
    maxConnections : appConfig.maxConnections,
    callback : function (error, result, done) {
        const $ = result.$;

        const links = $("a");
        links.each(function(i, link) {
            anchors[i] = $(link).attr("href");
            console.log("Anchor: " + link);
        });

        let rangeNumber = $($('.range')[0]).text().split(' ')[2]

        console.log("We are on item range: " + rangeNumber)

        let toQueueUrl = appConfig.BaseURL + rangeNumber

        if (parseInt(rangeNumber) < 1000) {
            medium.queue(toQueueUrl);
        } else {
            fs.appendFile('craigsListData.txt', JSON.stringify(jsonArray), function (err) {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
        }
    }
});
