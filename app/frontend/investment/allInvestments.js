var {user_model} = require('../../models')
var db = require('../../util/mysql_connection')

/**
 * Returns all investments
 */
module.exports = async function allinvestments_api(req, res) {
	try{
        console.log("Getting all investments")
        const [investments, fields2] = await db.connection.query("SELECT * FROM investment;");
	    res.send({code: "success", investments: investments})
 	}
 	catch(err){
        console.log(err)
 		res.status(400).send({msg: 'Failed getting all investments', err});
 	}
 }
