```
Maintain entire application business logic.
```
const express = require('express');
const http = require('http');
const scraper = require('./controller/scraper')

const app = express();
app.set('port', process.env.PORT || 8080);

http.globalAgent.maxSockets = 5;

app.get('/', scraper);

// Server starts.
app.listen(app.get('port'), () => {
    console.log(
        'App Running on: %d',
        app.get('port')
    );
    console.log('-------Press CTRL-C to stop---------\n');
});
