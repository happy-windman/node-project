var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service:'126',
  secureConnection: true, 
  secure: false, 
  auth: {
      user:'lsw_66@126.com', 
      pass: '2325763j8' 
  }
});



// let mailOptions = {
// from: 'lsw_66@126.com', 
// to: '2238267209@qq.com', 
// subject: 'Hello Liushiwei', 
// html: '<b>Hello world? 李安成</b>' 
// };

// transporter.sendMail(mailOptions, (error, info) => {
// if (error) {
//   return console.log(error);
// }
// console.log('Message sent: %s', info.messageId);

// }   );
