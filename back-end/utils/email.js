//引入模块
const nodemailer = require('nodemailer');

//设置邮箱配置
let transporter=nodemailer.createTranspoter({
  host:'smtp.163.com',//邮箱服务的主机，如smtp.qq.com

  //开启安全连接
  secure:false,
  //secureConnection:false,
  //用户信息
  auth:{
    user:'lsw_66@163.com',
    pass:''
  }
});

//设置收件人信息
let mailOptions={
  from:'',//谁发的
  to:'',//发给谁
  subject:'',//主题是什么
  text:'',//文本内容
  html:'',//html模板

   //附件信息
  attachments:[
  {
      filename:'',
      path:'',
    }
  ]
};

//发送邮件
transporter.sendMail(mailOptions,(error,info)=>{
  if(error)
    return console.log(error);
   console.log(`Message: ${info.messageId}`);
   console.log(`sent: ${info.response}`);
});