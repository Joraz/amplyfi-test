const bodyParser = require('body-parser');
const express = require('express');
const expressMongo = require('express-mongo-db');

const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

// middleware that appends a mongo db connection to each request
app.use(
  expressMongo(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/amplyfi-test'
  )
);

const distDirectory = __dirname + '/dist/';
app.use(express.static(distDirectory));

// Set up the api routes
app.use('/api', routes);

const server = app.listen(process.env.PORT || 9090, () => {
  console.log(`App now running on port ${server.address().port}`);
});
