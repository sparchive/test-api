const express = require('express');
// const limiter = require('../utils/rateLimit');

const send = require('./send');
const business = require('./business');
const sparktech = require('./sparktech');
const job = require('./jobs/cmc');
const rss = require('./rss');
const subscription = require('./subscription');

const router = express.Router();

router.get('/', (_, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/send', send);
router.use('/business', business);
router.use('/sparktech/contact', sparktech);
// router.use('/send', limiter, send);
// router.use('/business', limiter, business);
router.use('/jobs', job);
router.use('/rss', rss);
router.use('/subscription', subscription);

module.exports = router;
