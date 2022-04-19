const express = require('express');
const Parser = require('rss-parser');

const parser = new Parser();

const router = express.Router();

router.get('/', async (req, res) => {
  const { url = 'https://medium.com/feed/theecosystem' } = req.body;
  await parser.parseURL(url)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({
        error: error.code
      });
    });
});

module.exports = router;
