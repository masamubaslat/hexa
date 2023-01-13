const express = require ('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const MailMessage = require('nodemailer/lib/mailer/mail-message');
const app = express();
const port=5000;
app.use(cors());
app.use(express.json({limit:"25mb"}));
app.use(express.urlencoded({limit:"25mb"}));
app.use((req,res,next)=>{
    res.setHeader("Access-Controller-Allow-Origin","*");
    next();
});
const sendEmail =  ({recipient_email,message,fname,lname})=>{
    return new Promise((resolve,reject)=>{
        var transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"masa.mubaslat111@gmail.com",
                pass:"kirnmmoepnuqnmut",
            },
        });

        const mail_configs={
            from:recipient_email,
            to:"masa.mubaslat111@gmail.com",
            subject:"hexaSol",
            text:`Hello, I'm ${fname} ${lname} i send u this email to asking about ${message}` ,
        };
        //console.log(mail_configs);
        transporter.sendMail(mail_configs,function(error,info){
            if(error){
                console.log(error);
                return reject({message:`An erroe has accured`});
            }
            return resolve({message:"email sent succesfuly"});
        });
    });
}

app.post("/sendemail",(req,res)=>{
    sendEmail(req.body)
    .then((response)=>res.send(response.message))
    .catch((error)=>res.status(500).send(error.message));
})
app.listen(port,()=>{
    console.log('listening')
})
