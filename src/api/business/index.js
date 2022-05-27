const express = require('express');
const mailjet = require('node-mailjet')
  .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

const router = express.Router();

router.post('/', (req, res) => {
  const {
    email,
    firstName,
    lastName,
    country,
    state,
    phone,
    company,
    message
  } = req.body;

  const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'hello@justinbalaguer.dev',
            Name: 'Justin Dev'
          },
          To: [
            {
              // business@sparkpoint.io
              Email: 'justinanthony.primary@gmail.com',
              Name: 'SparkPoint Business Test'
            }
          ],
          Subject: company,
          HTMLPart: `
            <p>
              <b>Name:</b> ${lastName}, ${firstName}
            </p>
            <p>
              <b>Email:</b> ${email}
            </p>
            <p>
              <b>Country:</b> ${country}
            </p>
            <p>
              <b>State:</b> ${state}
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