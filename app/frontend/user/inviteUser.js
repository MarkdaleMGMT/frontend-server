var { user_model, email_model } = require('../../models')
var md5 = require('md5')
var mysql = require('../../../config/components/mysql.js')



module.exports = async function invite_user_api(req, res) {
	try{

    let username = req.body.username;
    let email = req.body.email;

    let user = await user_model.get_user_by_username(username);

    //get the referral code
    let ref_code = md5(user.username).slice(0,5);

    //prepare email
    let link = "http://"+ mysql.host + "/signup?ref_code=" + ref_code
    let text = "You have been invited by " +user.username + ". You can use the following link to Sign Up: " + link + "\n "
    let send_email = await email_model.send_email(email, text)
    console.log("send email", send_email)

    //send email
	  res.send({code: "Invite sent successfully"})
 	}
 	catch(err){
 		res.status(400).send({msg: 'Failed to send invite', err});
 	}
 }
