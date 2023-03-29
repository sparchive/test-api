const express = require('express');
const mailjet = require('node-mailjet')
  .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

const router = express.Router();

router.post('/', (req, res) => {
  const {
    email,
    fullname,
    phone,
    company,
    message,
    businessAddress,
    attachment
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
              //Email: 'business@sparkpoint.io',
              Email: 'justinanthony.primary@gmail.com',
              Name: 'SparkPoint Business'
            }
          ],
          Subject: company,
          HTMLPart: `
            <p>
              <b>Name:</b> ${fullname}
            </p>
            <p>
              <b>Email:</b> ${email}
            </p>
            <p>
              <b>Phone:</b> ${phone}
            </p>
            <p>
              <b>Company:</b> ${company}
            </p>
            <p>
              <b>Message:</b> ${message}
            </p>
            <p>
              <b>Business Address:</b> ${businessAddress}
            </p>
          `,
          CustomID: company,
          Attachments: [attachment]
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
