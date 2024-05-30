

import * as nodemailer from 'nodemailer';

const sendMail=(email,subject,msg)=>{

  try{
    //send mail.message.
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: 'hamroghar531@gmail.com',
          pass: process.env.MAIL_PASS
        }
      });
      
      // Set up the email data
      const mailOptions = {
        from: 'hamroghar531@gmail.com',
        to: email,
        subject: subject,
        html: msg
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });  
    }catch(error){
     console.log(err);
    } 

}

let sendMailFile=(email,subject,msg,file)=>{

//send mail.message.
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: 'hamroghar531@gmail.com',
    pass: process.env.MAIL_PASS
  }
});

// Set up the email data
const mailOptions = {
  from: 'hamroghar531@gmail.com',
  to: email,
  subject: subject,
  text: msg,
  attachments: [
    {
      filename: file,
      path: file
    }
  ]
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});   

}

export {sendMail,sendMailFile}
