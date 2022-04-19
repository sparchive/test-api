/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

const axios = require('axios');

router.get('/', async (req, res) => {
  await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {
    params: {
      symbol: 'SRK'
    },
    headers: {
      'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY,
    }
  })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
