
var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service:'163',
  secureConnection: true, 
  secure: false, 
  auth: {
      user:'lianchenglac@163.com', 
      pass: 'liancheng123' 
  }
});


module.exports={
  transporter
}
