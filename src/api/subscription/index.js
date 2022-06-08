/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const mailjet = require('node-mailjet')
  .connect(process.env.MJS_APIKEY_PUBLIC, process.env.MJS_APIKEY_PRIVATE);

router.post('/', async (req, res) => {
  const { Name, Email } = req.body;
  const request = mailjet
    .post('contactslist')
    .id('10280140')
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
