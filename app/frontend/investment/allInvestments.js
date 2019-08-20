var {investment_model} = require('../../models')


/**
 * Returns all investments
 */
module.exports = async function allinvestments_api(req, res) {
	try{
      console.log("Getting all investments");
			let investments = [];
			if(req.body.username){
				let username = req.body.username;
				investments = await investment_model.get_all_investments_per_user(username);
			}
			else {
				investments =  await investment_model.get_all_investments();
			}



	    res.send({code: "success", investments: investments})
 	}
 	catch(err){
        console.log(err)
 		res.status(400).send({msg: 'Failed getting all investments', err});
 	}
 }
