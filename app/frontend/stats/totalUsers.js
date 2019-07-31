const dateFormat = require('dateformat');
const { get_registered_users_by_date } = require('../../models').user_stats_model
const moment = require("moment");


module.exports = async function get_registered_users_api(req, res) {
	try{


    let current_date = new Date();
    current_date = dateFormat(current_date,'yyyy-mm-dd');
    //initialized to the number of users registered as of that date
    let user_count = await get_registered_users_by_date(current_date);
	  res.send({code: "Success",user_count })
 	}
 	catch(err){
    console.error(err);
 		res.status(400).send({msg: 'Failed to fetch registered users count', err:err.message});
 	}
 }


//create a view that groups the date and count of the records
//
