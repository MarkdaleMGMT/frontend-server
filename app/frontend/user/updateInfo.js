var { user_model } = require('../../models')

module.exports = async function update_user_info(req, res) {
	try{

    let flag = req.body.new_user;
    let username = req.body.username;

    let updateSuccess = await user_model.update_new_user_flag(username, flag);

    if(updateSuccess)
    //send email
	   res.send({ code: "success", message:"Info updated successfully"})
    else {
      throw new Error("Failed to update user info")
    }
 	}
 	catch(err){
 		res.status(400).send({code: 'failure', message:err.message});
 	}
 }
