
const nodemailer = require('nodemailer');

function mailToUser(user_mail){
    const transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
           auth: {
                user: '@gmail.com',
                pass: '',
             },
        secure: true,
        })
    
    const mailData = {
        from: 'rohanranaynr@gmail.com',  // sender address
      to: user_mail,   // list of receivers
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html: '<b>Hey there! </b>'
             +'<br> This is our first message sent with Nodemailer<br/>',
    }
    
    transporter.sendMail(mailData, function(error, info){
        if (error) {
          console.log(error);
          res.send('error')
        } else {
          console.log('Email sent: ' + info.response);
          res.send('working')
        }
      });
}

module.exports = {
    mailToUser
}