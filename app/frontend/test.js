var { user_model } = require('../models')
var db = require('../util/mysql_connection');
var md5 = require('md5')
var request = require("request-promise");
createUser = async () => {
    let result = await user_model.create_user({ username: 'TESTINGUSER123', password: "TESTPASS", email: "TESTINGUSER123@TEST.COM" })
    return
}
checkUserCreated = async () => {
    let [user, fields] = await db.connection.query("SELECT * FROM user WHERE username = ?", ['TESTINGUSER123'])
    console.log("checkusercreated user", user)
    return user.length == 1
}

emailConfirmUser = async () => {
    let [user, fields] = await db.connection.query("UPDATE user SET email_verify_flag = 1 WHERE username = ?;", ['TESTINGUSER123'])
    console.log("emailConfirmUser user", user)
    return user.length == 1
}
deleteUser = async () => {
    let x = await db.connection.query("DELETE FROM user WHERE username = ?", ['TESTINGUSER123'])
    return
}
const handle_axios_error = function(err) {

    if (err.response) {
        const custom_error = new Error(err.response.statusText || 'Internal server error');
        custom_error.status = err.response.status || 500;
        custom_error.description = err.response.data ? err.response.data.message : null;
        throw custom_error;
    }
    throw new Error(err);

}

module.exports = async function test_api(req, res) {
    try {
        switch (req.body.test) {
            case 0:
                try {
                    console.log("testing login")
                    let x = await createUser()
                    let result = await checkUserCreated();
                    if (result == false) {
                        res.status(400).send({ msg: 'Failed login test', fail: "Could not create user" })
                        break
                    }
                    let data = { username: 'TESTINGUSER123', password: "TESTPASS" }
                    console.log("data", data)
                    let testlog = await request({ uri: 'http://' + req.headers.host + '/frontend/login', method: "POST", body: data, json: true })
                    console.log("tsetlog", testlog)
                    deleteUser()
                    res.send({ msg: 'Failed login test', fail: "Can login even if email not confirmed" })
                    break

                } catch (err) {
                	let data = { username: 'TESTINGUSER123', password: "TESTPASS" }	
                    let confirmemail = await emailConfirmUser()
                    testlog = await request({ uri: 'http://' + req.headers.host + '/frontend/login', method: "POST", body: data, json: true })
                    if (testlog.code != 'Login successful') {
                        deleteUser()
                        res.send({ msg: 'Failed login test', fail: testlog.error })
                        break

                    }
                    deleteUser()
                    res.send({ msg: 'Login test successful' })
                    break;
                }

        }
    } catch (err) {
        deleteUser()
        console.log("CAUGHT ERR", err)
        res.status(400).send({ msg: 'Failed login test', err });
    }
}
