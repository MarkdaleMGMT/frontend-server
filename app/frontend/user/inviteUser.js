var { user_model, email_model } = require('../../models')
var md5 = require('md5')
var { domain } = require('../../../config')



module.exports = async function invite_user_api(req, res) {
	try{

    let username = req.body.username;
    let email = req.body.email;

    let user = await user_model.get_user_by_username(username);

    //get the referral code
    let ref_code = md5(user.username).slice(0,5);

    //prepare email
    let link = domain + "/signup?ref_code=" + ref_code
    let text = "You have been invited by " +user.username + ". You can use the following link to Sign Up: " + link + " using the referral code "+ref_code+"\n "
    let send_email = await email_model.send_email(email, "Invitation to Qoinify", text)
    console.log("send email", send_email)

    //send email
	  res.send({code: "Invite sent successfully"})
 	}
 	catch(err){
 		res.status(400).send({code: 'Failed to send invite', message:err.message});
 	}
 }
