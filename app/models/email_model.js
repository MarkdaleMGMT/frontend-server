const nodemailer = require("nodemailer");
const util = require("util");
const { email_config } = require('../../config');


var transporter = nodemailer.createTransport(email_config);

async function send_email(receiver, subject, text){
	let mailOptions = {
		from: '"Qoinify" <admin@qoinify.com>', // sender addressutil.format('"Markdale <%s>', process.env.GMAIL)
		to: receiver, // list of receivers
		subject: subject, // Subject line
		text: text // plain text body
		};

	transporter.sendMail(mailOptions, (error, info) => {
	            if (error) {
	                console.log("send email error", error);
	            } else {
	                console.log("successfully sent email!")
	            }
	        });
	return
}
module.exports = {send_email}
