// ```
// Handle the scraper logic.
// ```
const Crawler = require('crawler');
const cheerio = require('cheerio');

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
                        console.log(result.request.host + href);
                        const followURL = appConfig.BaseURL + href
                        medium.queue(followURL);
                    }
                }
            });
        }
    }
});

medium.queue(appConfig.BaseURL);
