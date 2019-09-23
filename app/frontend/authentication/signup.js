var { user_model, email_model } = require("../../models");
var { domain } = require("../../../config");
var md5 = require("md5");

async function check_referral(code) {
  let users = await user_model.get_all_users();
  for (let i = 0; i < users.length; i++) {
    console.log("refcode", md5(users[i].username).slice(0, 5), "code", code);
    if (md5(users[i].username).slice(0, 5) == code) {
      return users[i].username;
    }
  }
  return false;
}
async function check_email(emailEntered) {
  let users = await user_model.get_all_users();
  for (let i = 0; i < users.length; i++) {
    if (md5(users[i].email).slice(0, 5) == emailEntered) {
      return false;
    }
  }
  return true;
}
module.exports = async function signup_api(req, res) {
  try {
    let verifyCode = await check_referral(req.body.code);
    let verifyEmail = await check_email(req.body.email);
    console.log("verify", verify);

    if (verifyCode != false) {
      if (verifyEmail != false) {
        let result = await user_model.create_user(req.body);
        console.log("sign up key", result);
        let add_ref = await user_model.add_referral(req.body.username, verify);
        console.log("add ref", add_ref);
        console.log("email", req.body.email);
        let link = domain + "/frontend/email/" + result;
        let send_email = await email_model.send_email(
          req.body.email,
          "Email Verification",
          "please confirm your email by going to this link: " + link
        );
        res.send({
          code: "Signup successful",
          ref_code: md5(req.body.username).slice(0, 5)
        });
      }else{
		  throw new error("Email you entered has been used, please enter a no-registered Email");
	  }
    } else {
      console.log("Incorrect ref code");
      throw new Error("Incorrect referral code");
    }
  } catch (err) {
    res.status(400).send({ code: "Signup failed", message: err.message });
  }
};
