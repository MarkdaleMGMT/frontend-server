const app = module.exports = require('express')();
// const transaction_methods = require('./transaction_methods')
const { twoDigits } = require('../util/common.js')

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};


//define the endpoints

//authentication related endpoints
app.post('/login', require("./authentication/login"))
app.post('/signup', require("./authentication/signup"))
app.post('/reset_password', require('./authentication/resetPassword'))
app.post('/update_password', require('./authentication/updatePassword'))
app.get('/email/:key', require("./authentication/email"))

//user related endpoints
app.get('/clam_balance', require("./user/clamBalance"))
app.get('/user_data/:username', require("./user/userData"))
app.get('/all_users', require("./user/allUsers"))
app.post('/invite_user', require("./user/inviteUser"))
app.post('/update_info', require("./user/updateInfo"))


//investment related endpoints
app.post('/all_investments', require("./investment/allInvestments"))

//stats
app.post('/stats/daily_registered_users', require("./stats/registeredUsers"))
app.get('/stats/total_users', require("./stats/totalUsers"))


//test endpoint
app.post('/test', require("./test"))
