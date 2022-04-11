const express = require('express');

const send = require('./send');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/send', send);

module.exports = router;
