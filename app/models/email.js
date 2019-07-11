const nodemailer = require("nodemailer");


var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    requireTLS: true,
    auth: {
      user: "uppercanadacoins@gmail.com", 
      pass: "UpperCanadaCoins123"
    },
    tls : {
  ciphers : 'SSLv3'
}
  });

async function sendEmail(receiver, subject, text){
	let mailOptions = {
		from: '"Markdale Financial Management" <uppercanadacoins@gmail.com>', // sender address
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
