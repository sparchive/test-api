const rateLimit = require('express-rate-limit');

const apiLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 20,
  message: 'Uh oh! Spam detected. You can send us email directly at support@sparkpoint.io',
  headers: true
});

module.exports = apiLimit;
