var db = require('../util/mysql_connection')

async function get_all_investments(){
    const [investments, fields] = await db.connection.query("SELECT * FROM investment;");
    return investments;
}

async function get_all_investments_per_user(username){
  const [investments, fields] = await db.connection.query(
    "SELECT investment.*, account.account_id FROM investment JOIN account ON (investment.investment_id = account.investment_id) WHERE username=?;"
    ,[username]);
  return investments;
}


module.exports={
  get_all_investments,
  get_all_investments_per_user
}
