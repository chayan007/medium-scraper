// ```
// Maintain entire application business logic.
// ```
const express = require('express');
const http = require('http');
const scraper = require('./controller/scraper')
const appConfig = require('./config/scraper')

const app = express();
app.set('port', appConfig.port);

http.globalAgent.maxSockets = appConfig.maxConnections;

const _ = scraper.medium;

app.listen(app.get('port'), () => {
    console.log(
        '\nApp Running on: %d',
        app.get('port')
    );
    console.log('\nPress CTRL-C to stop\n');
});
