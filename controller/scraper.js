// ```
// Handle the scraper logic.
// ```
const Crawler = require('crawler');
const cheerio = require('cheerio');
const LinkDbIO = require('./dbio')

const appConfig = require('../config/scraper')


let medium = new Crawler({
    maxConnections : appConfig.maxConnections,
    callback : function (error, result, done) {
        if (error) {
            console.log(error)
        } else {
            const $ = cheerio.load(result.body);
            $('a').each(function (i, a) {
                const href = a.attribs.href;
                if (href) {
                    if (href.startsWith('/')) {
                        const followURL = appConfig.BaseURL + href
                        LinkDbIO.validateAndPush(followURL);
                        medium.queue(followURL);
                    }
                }
            });
        }
    }
});
console.log('Scraping Initiated !')
medium.queue(appConfig.BaseURL);

module.exports = {
    medium: medium
}
