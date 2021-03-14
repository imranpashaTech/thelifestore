'use strict';
const nodemailer = require('nodemailer');
const secure = require('../const/secure');
module.exports = class Mailer{

    constructor(){
        this.transporter = nodemailer.createTransport({
            // host: 'smtp.ethereal.email',
            host: 'smtp.gmail.com',
            port: 25,
            secure: false, // true for 465, false for other ports
            auth: {
                user:secure.username, // generated ethereal user
                pass:secure.password // generated ethereal password
            },
            tls: {
                rejectUnauthorized:false
            }
        });
    }
    async sendeMail(email_data){
        return  await this.transporter.sendMail({
            from: email_data.from, // sender address
            to: email_data.to, // list of receivers
            subject: email_data.subject, // Subject line
            html: email_data.html, // plain text body
            // html: '<b>Hello Vrusti?</b>' // html body
        });
    }
}
// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         // host: 'smtp.ethereal.email',
//         host: 'smtp.gmail.com',
//         port: 25,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user:secure.username, // generated ethereal user
//             pass:secure.password // generated ethereal password
//         },
//         tls: {
//             rejectUnauthorized:false
//         }
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: 'ímranpasha.cbit@gmail.com, imranpasha@madlab.in', // list of receivers
//         subject: 'Hello ✔', // Subject line
//         text: 'Hello world?', // plain text body
//         html: '<b>Hello world?</b>' // html body
//     });

//     console.log('Message sent: %s', info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);