const sgMail = require('@sendgrid/mail');

require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = data => {
  const email = { ...data, from: 'iura.radulov@gmail.com' };
  sgMail
    .send(email)
    .then(() => true)
    .catch(error => {
      throw error;
    });
};

module.exports = sendEmail;

