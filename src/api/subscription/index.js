/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const mailjet = require('node-mailjet')
  .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

router.post('/', async (req, res) => {
  const { Name, Email } = req.body;
  const request = mailjet
    .post('contactslist', { version: 'v3' })
    .id('12149')
    .action('managecontact')
    .request({
      Name,
      Properties: 'object',
      Action: 'addnoforce',
      Email
    });
  request
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
