
// we will send email 
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

    // create transpoder //nodemailer
    console.log("came inside");

    const transpoder = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
    })



    // we need to define the options 

    const body = {
        from: "chandanbhagat144@gmail.com",
        to: options.to,
        subject: options.sub,
        text: options.message,
    }

    // we need to send the mail

    await transpoder.sendMail(body)







}


module.exports = sendEmail;















