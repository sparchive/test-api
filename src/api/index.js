const express = require('express');
const limiter = require('../utils/rateLimit');

const send = require('./send');
const business = require('./business');
const job = require('./jobs/cmc');
const rss = require('./rss');
const subscription = require('./subscription');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/send', limiter, send);
router.use('/business', limiter, business);
router.use('/jobs', job);
router.use('/rss', rss);
router.use('/subscription', subscription);

module.exports = router;
