const express = require('express');
const gender = require('gender-detection');
const mongo = require('mongodb');

const router = express.Router();
const carDataCollection = 'carData';

router.get('/location', async (req, res) => {
  /** @type {mongo.Db} */
  const db = req.db;
  const results = await db
    .collection(carDataCollection)
    .aggregate([
      {
        $unwind: {
          path: '$m_Places',
        },
      },
      {
        $group: {
          _id: '$m_Places',
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 20,
      },
    ])
    .toArray();

  const mappedResults = results.map(r => r._id);

  return res.status(200).send(mappedResults);
});

router.get('/location/:location/gender', async (req, res) => {
  /** @type {mongo.Db} */
  const db = req.db;

  const { location } = req.params;

  const results = await db
    .collection(carDataCollection)
    .aggregate([
      {
        $match: {
          m_Places: location,
        },
      },
      {
        $unwind: {
          path: '$m_People',
        },
      },
      {
        $group: {
          _id: null,
          names: {
            $addToSet: '$m_People',
          },
        },
      },
    ])
    .toArray();

  // We've grouped on null, so there will only be one result
  const [result] = results;
  const genders = {
    male: 0,
    female: 0,
    unknown: 0,
    unisex: 0,
  };

  result.names.forEach(name => {
    if (name && name.length) {
      const genderGuess = gender.detect(name);
      genders[genderGuess]++;
    }
  });

  return res.status(200).send(genders);
});

router.get('/location/:location/keywords', async (req, res) => {
  /** @type {mongo.Db} */
  const db = req.db;

  const { location } = req.params;

  const results = await db
    .collection(carDataCollection)
    .aggregate([
      {
        $match: {
          m_Places: location,
        },
      },
      {
        $unwind: {
          path: '$m_BiGrams',
        },
      },
      {
        $group: {
          _id: '$m_BiGrams',
          count: {
            $sum: 1,
          },
        },
      },
      {
        $match: {
          count: {
            $gt: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 20,
      },
    ])
    .toArray();

  return res.status(200).send(results);
});

router.get('/location/:location/sources', async (req, res) => {
  /** @type {mongo.Db} */
  const db = req.db;

  const { location } = req.params;

  const results = await db
    .collection(carDataCollection)
    .aggregate([
      {
        $match: {
          m_Places: location,
        },
      },
      {
        $unwind: {
          path: '$m_Places',
        },
      },
      {
        $group: {
          _id: '$m_szSourceType',
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 20,
      },
    ])
    .toArray();

  return res.status(200).send(results);
});

module.exports = router;
