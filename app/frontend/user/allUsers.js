var {user_model} = require('../../models')
var db = require('../../util/mysql_connection')

sortUsers = async (users) => {
	let allUsers = []
    let admins = []
    for(let i=0; i<users.length; i++){
        let user = users[i]
        let balance = await user_model.get_balance(user.username)

        allUsers.push({username: user.username, clam_balance: balance, email: user.email}) // clam_balance depreciated

        if(user.level == 0){ // sort users into admin and all users
            admins.push({username: user.username})
        }

    }
    return {users: allUsers, admins: admins}


}
module.exports = async function allusers_api(req, res) {
	try{
        console.log("Getting all users")
        const [users2, fields2] = await db.connection.query("SELECT * FROM user;");
        console.log("test", users2)
		let users = await user_model.get_all_users()
		let sorted = await sortUsers(users)
	    res.send({code: "success", users: sorted.users, admins: sorted.admins})
 	}
 	catch(err){
        console.log(err)
 		res.status(400).send({msg: 'Failed getting all users', err});
 	}
 }
