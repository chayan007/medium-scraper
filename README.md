![Eraser Head](readme-fun.jpeg?raw=true "Aizawa Sensei")

## Medium Recursive Scraper Project

This is the most basic scraping tool created in express to harvest all internal `href` URLs of medium.

- Maximum connections are restricted to 5 threads.
- Almost optimized database I/O to increase speed.
- Structured project layout.

#### The model *Link* stores the following:

- Unique URL
- No of references
- No of parameters

#### Core dependencies used for scraping:

- crawler
- cheerio

### Local Setup:

- Clone the repository in your local machine.
- `npm install` to install all dependencies.
- `nodemon app.js` to trigger the server.

##### Note: 

- The repository is dockerized.
- Tests to be added.
- False positive cases need to be tested thoroughly.
