const nodemailer = require("nodemailer");
const { email_config } = require('../../config');



var transporter = nodemailer.createTransport(email_config);

async function sendEmail(receiver, subject, text){
	let mailOptions = {
		from: '"Markdale <uppercanadacoins@gmail.com>', // sender address
		to: receiver, // list of receivers
		subject: "Confirm Email for Markdale Financial Management", // Subject line
		text: text // plain text body
		};

	transporter.sendMail(mailOptions, (error, info) => {
	            if (error) {
	                console.log(error);
	            } else {
	                console.log("successfully sent email!")
	            }
	        });

}
module.exports = {sendEmail}
