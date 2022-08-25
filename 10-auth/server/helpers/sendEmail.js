const nodemailer = require('nodemailer')

const EMAIL = 'lauretta.fadel63@ethereal.email';
const PASSWORD = 'gjWvk7z7Ns6eHMBy3t';
const NAME = 'Lauretta Fadel'

const transport = nodemailer.createTransport({
    // options
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    }
})

async function sendEmail({ email, html, subject }) {
    return transport.sendMail({
        to: email,
        subject,
        from: `${NAME} <${EMAIL}>`,
        html,
        // text: 'Your OTP is 12345',
        // html: '<b>Your OTP is 12345</b>'
    })
}


module.exports = {
    transport,
    sendEmail
};