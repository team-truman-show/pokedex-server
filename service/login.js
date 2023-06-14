
const User = require("../models/users");
const tokenUtil = require("../lib/tokenUtil");
const {verifyPassword} = require("../lib/passwordUtil");

async function performLogin(userid, password) {
  try {
    const user = await User.findOne({
      where: { userid: userid },
    });

    if (!user) {
      return false;
    }
    // console.log(user.salt, user.password, password);
    const isPasswordValid = await verifyPassword(
      password,
      user.salt,
      user.password
    );
    if (!isPasswordValid) {
      return false;
    }

    return true;
  } catch (err) {
    throw err;
  }
}

async function login(userid,password) {
    try {
      const isLoginSuccessful = await performLogin(userid, password);

      if (isLoginSuccessful) {
        const token = tokenUtil.makeToken(userid);
        return token;
      }
      return new Error('로그인 실패');
    } catch (err) {
      return err;
    }
}

module.exports = login;
