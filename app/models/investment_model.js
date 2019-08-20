var db = require('../util/mysql_connection')

async function get_all_investments(){
    const [investments, fields] = await db.connection.query("SELECT * FROM investment;");
    return investments;
}

async function get_all_investments_per_user(username){
  const [investments, fields] = await db.connection.query("SELECT * FROM investment WHERE investment_id IN (SELECT investment_id FROM account where username = ?);",[username]);
  return investments;
}


module.exports={
  get_all_investments,
  get_all_investments_per_user
}
