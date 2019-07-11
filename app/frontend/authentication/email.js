var { user_model} = require('../models')

module.exports = async function confirm_email(req, res){
	let key = req.params.key
	let confirm = await user_model.confirm_email(key)
	return res.redirect("http://165.227.35.11/dashboard?confirm=true")

}
