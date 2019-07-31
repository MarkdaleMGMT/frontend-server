var db = require('../util/mysql_connection');
const bcrypt = require('bcrypt');
var md5 = require('md5')


async function get_user_transactions(username){

    const [rows, fields] = await db.connection.query("SELECT * FROM transaction WHERE username = ? ORDER BY time ASC",[username]);
    return rows;

}

async function get_all_users(){

  const [users, fields] = await db.connection.query("SELECT * FROM user WHERE username != 'clam_miner'");
  return users;
}

async function create_user(body){
  console.log("new user body", body)
  let username = body.username
  let password = body.password
  let email = body.email
  const saltRounds = 10;
  let hashedPassword = await bcrypt.hash(password, saltRounds)
  let verify_key = md5(username).slice(-5)
  let query = "INSERT INTO `user` (`username`, `password`, `level`, `registered_on`, `email`, `email_verify_key`, `email_verify_flag`, `affiliate`) VALUES (?, ?, 1, CURRENT_TIMESTAMP, ?, ?, '0', '');"
  let result = db.connection.query(query, [username, hashedPassword, email, verify_key])
  console.log("signup", username)
  return verify_key
}

async function get_user_by_username(username){
  const [rows, fields] = await db.connection.query("SELECT * FROM user WHERE username = ?;",[username]);
  return rows[0];
}

async function reset_password(token, new_pass){
  const saltRounds = 10;
  let hashedPassword = await bcrypt.hash(new_pass, saltRounds)
  const [rows, fields] = await db.connection.query("UPDATE user SET password = ? WHERE email_token = ?;", [hashedPassword, token])
  return rows[0];
}

async function set_email_token(email, token){
  let today = new Date();
  let nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
  let nw_mysql = nextweek.toMysqlFormat()
  const [rows, fields] = await db.connection.query("UPDATE user SET email_token = ?, email_expire = ? WHERE email = ?;", [token, nw_mysql, email])
  return rows[0]
}
async function check_token_expire(token){
  let [user, fields] = await db.connection.query("SELECT * FROM user WHERE email_token = ?", [token])

  if(user.length == 0){
    return false
  }
  console.log("exp: ", user[0])
  let exp = user[0].email_expire
  let exp_date = new Date(exp);
  let today = new Date()
  console.log("expire: ", exp_date)
  return exp_date >= today
}
async function add_referral(user, affiliate){
  console.log("add reffff")
  let query = "UPDATE user SET affiliate = ? WHERE username = ?;"
  let result = db.connection.query(query, [affiliate, user])
  console.log(result)
  return result
}
async function confirm_email(key){
  let query = "UPDATE user SET email_verify_flag = 1 WHERE email_verify_key = ?;"
  let result = await db.connection.query(query, [key])
  console.log(result)
  return result
}


async function get_balance(username){
  let user = await get_user_by_username(username);
  if(!user) throw new Error('User does not exist');

  let account_type = user.account_type;


  let transactions = await get_user_transactions(username);

  let total_credits = 0;
  let total_debits = 0;

  for(let i=0; i<transactions.length; i++){


    let user_transaction = transactions[i];
    let amount = parseFloat(user_transaction.amount);

    console.log("amount ",amount);

    if(amount < 0){
       total_credits += (amount * -1.0);
    }else{
      total_debits += amount;
    }

  }//end for

  let user_balance = 0;
  if (account_type == 'debit'){
    user_balance = total_debits - total_credits;
  }
  else {
    user_balance = total_credits - total_debits;
  }
  console.log("total_credits ",total_credits);
  console.log("total_debits ",total_debits);

  return user_balance;
}




module.exports = {
  // build_update_user_balance,
  get_user_by_username,
  get_all_users,
  create_user,
  add_referral,
  confirm_email,
  get_balance,
  set_email_token,
  check_token_expire,
  reset_password
};
