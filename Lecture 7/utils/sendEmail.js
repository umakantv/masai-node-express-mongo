const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: "j3tcnyv2kr7xakcg@ethereal.email",
        pass: "9GRypfkXnUpzb8quzC",
    },
});

async function sendEmail({subject, html}) {
  
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', 
      to: "ranchov007@gmail.com", 
      subject, html,
        
    });
  
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
  }
  
  module.exports = sendEmail;