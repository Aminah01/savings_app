require('dotenv').config()

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


// const sendEmail = (receipientEmail, title, details) => {

    const sendEmail = (to, subject, text, html ) => {

const msg = {
  to: 'aminahadedeji@yahoo.co.uk',//'test@example.com', // Change to your recipient
  from: 'info.haqq22@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })


}

  module.exports = { sendEmail }