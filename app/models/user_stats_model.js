var db = require('../util/mysql_connection');


async function get_registered_users(start_date, end_date){

  const [stats, fields] = await db.connection.query("SELECT * FROM daily_registered_users WHERE registered_on BETWEEN ? AND ?",[start_date, end_date]);
  return stats;
}

async function get_registered_users_by_date(date){

  const [rows, fields] = await db.connection.query("SELECT sum(daily_registered_users.count) FROM daily_registered_users WHERE registered_on <= ?",[date])
  return rows;
}

module.exports = {

  get_registered_users,
  get_registered_users_by_date

};
