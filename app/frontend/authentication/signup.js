var {user_model, email_model } = require('../../models')
var { domain } = require('../../../config')
var md5 = require('md5');



async function check_referral(code){
	let users = await user_model.get_all_users()
	for(let i=0; i< users.length; i++){
		console.log("refcode", md5(users[i].username).slice(0,5), "code", code)
		if(md5(users[i].username).slice(0,5) == code){
			return users[i].username
		}
	}
	return false
}
module.exports = async function signup_api(req, res) {
	try{
		let verify = await check_referral(req.body.code)
		console.log("verify", verify)

		if (!verify) {
			console.log("Incorrect ref code")
 			throw new Error("Incorrect referral code")
		}

		let dup = await user_model.get_user_by_username(req.body.username)
		console.log("dup is:" + JSON.stringify(dup))
		if (dup != null){
			throw new Error("The username is already taken! Please enter another one")
		}

		try {
			let result = await user_model.create_user(req.body)
			console.log("sign up key", result)
			 
	 		let add_ref = await user_model.add_referral(req.body.username, verify)
	 		console.log("add ref", add_ref)
			console.log("email", req.body.email)
			 
	 		let link = domain + "/frontend/email/" + result
	 		let send_email = await email_model.send_email(req.body.email, "Email Verification", "please confirm your email by going to this link: " + link)
	 		res.send({code: "Signup successful", ref_code: md5(req.body.username).slice(0,5)})
		} catch (err) {
			throw err
		}

 	}
 	catch(err){
 		res.status(400).send({code: 'Signup failed', message:err.message});
 	}
 }
