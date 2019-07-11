var { user_model} = require('../../models')
var mysql = require('../../../config/components/mysql.js')
module.exports = async function confirm_email(req, res){
	let key = req.params.key
	let confirm = await user_model.confirm_email(key)
	return res.redirect("http://" + mysql.host + "/dashboard?confirm=true")

}
