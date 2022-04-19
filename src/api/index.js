const express = require('express');
const limiter = require('../utils/rateLimit');

const send = require('./send');
const job = require('./jobs/cmc');
const rss = require('./rss');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/send', limiter, send);
router.use('/jobs', job);
router.use('/rss', rss);

module.exports = router;
