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

async function send_email(receiver, text){
	let mailOptions = {
		from: '"Markdale <uppercanadacoins@gmail.com>', // sender address
		to: receiver, // list of receivers
		subject: "Markdale Financial Management", // Subject line
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
