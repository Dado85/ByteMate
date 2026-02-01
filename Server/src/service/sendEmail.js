const nodemailer=require("nodemailer");
require("dotenv").config();

class MailService{
  constructor(){
    this.transporter=null;
    this.intializeTransPorter();
  }
  intializeTransPorter(){
    try {
      this.transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:false,
        auth:{
          user:process.env.SMTP_USER,
          pass:process.env.SMTP_PASS
        }
      })
    } catch (error) {
      console.error("error mail transporter:",error);
      
    }
  }
  async sendEmail(options){
    const{to,subject,text,html}=options
    if(!this.transporter){
      console.error("mail transport is not intialized:");
      return;
    }
    const mailOptions={
       from:process.env.EMAIL_FROM,
       to:to,
       subject:subject,
       text:text,
       html:html
    }
    try {
      const info=await this.transporter.sendMail(mailOptions);
      console.log("email sent:",info.response);
      return {sucess:true,info:info};
    } catch (error) {
      console.error("error sending email:",error);
    }
  }
}
const mailservice=new MailService();
module.exports=mailservice