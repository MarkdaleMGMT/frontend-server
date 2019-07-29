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


//investment related endpoints
app.get('/all_investments', require("./investment/allInvestments"))


//test endpoint
app.post('/test', require("./test"))
