const express = require('express');

const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
app.use(bodyParser.json());

const carDataCollection = 'carData';

/** @type {mongodb.Db}  */
let db;

mongodb.MongoClient.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/test',
  (err, client) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    db = client.db();

    const server = app.listen(process.env.PORT || 9090, () => {
      console.log(`App now running on port ${server.address().port}`);
    });
  }
);

app.get('/', (req, res) => {
  db.collection(carDataCollection)
    .find({})
    .toArray((err, docs) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json(docs);
      }
    });
});
