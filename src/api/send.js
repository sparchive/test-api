const express = require('express');
const mailjet = require('node-mailjet')
  .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

const router = express.Router();

router.post('/', (req, res) => {
  const {
    name,
    email,
    company,
    subject,
    message
  } = req.body;

  const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'support@sparkpoint.io',
            Name: 'SparkPoint Support'
          },
          To: [
            {
              Email: 'justinathony.primary@gmail.com',
              Name: 'SparkPoint Support'
            }
          ],
          Subject: subject,
          HTMLPart: `
            <p>
              <b>Name:</b> ${name}
            </p>
            <p>
              <b>Email:</b> ${email}
            </p>
            <p>
              <b>Company:</b> ${company}
            </p>
            <p>
              <b>Message:</b> ${message}
            </p>
          `,
          CustomID: company
        }
      ]
    });

  request
    .then(() => {
      res.json({
        status: 200,
        message: 'Email sent!'
      });
    })
    .catch((err) => {
      res.json({
        status: err.status,
        message: err
      });
    });
});

module.exports = router;
