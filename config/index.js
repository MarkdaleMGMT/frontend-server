'use strict'

const mysql_config = require('./components/mysql')
const email_config = require('./components/email')

module.exports = {
  mysql_config :mysql_config,
  email_config: email_config

}
