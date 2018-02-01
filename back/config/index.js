const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.GMAIL_USER_EMAIL,
      pass: process.env.GMAIL_USER_PASSWORD
  }
 })

module.exports = {
  mongodbUrl: 'mongodb://santa:test@ds121088.mlab.com:21088/gifts',
  transporter
}