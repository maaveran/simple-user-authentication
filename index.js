// index.js

// set up ======================================================================
const fs = require('fs');
const https = require('https');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const { db, } = require('./pgp');

// configuration ===============================================================
// set up our express application
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

nunjucks.configure('views', {
    autoescape: false,
    express: app,
    cache: false
});
app.engine('html', nunjucks.render);
app.set('view engine', 'njk');

// routes ======================================================================
require('./routes/routes')(app, express);

// launch ======================================================================
const port = 3000;
app.listen(port, () => {
    console.log('Ready for GET requests on http://localhost:' + port);
});

// https.createServer({
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// }, app).listen(3000, () => {
//     console.log('Ready for GET requests on http://localhost:' + 3000);
// });