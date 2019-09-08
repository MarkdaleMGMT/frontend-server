var { user_model } = require('../../models')

module.exports = async function update_pass(req, res){
	let token = req.body.token
	let pass = req.body.pass
	console.log("reset token: ", token, "pass: ", pass)
	try{
		let token_check = await user_model.check_token_expire(token)
		console.log("token check", token_check)
		if(token_check){
			let reset = user_model.reset_password(token, pass)
			res.send({code: "Reset successful"})
		}
		else{
			throw new Error("Token does not exist!")
		}
	}
	catch(err){
		console.log(err)
		res.status(400).send({msg: 'Reset failed', err:err.message});
	}

}
