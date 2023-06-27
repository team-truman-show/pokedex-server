const { findUser } = require("../../dao/userDao/joinDao");
const tokenUtil = require("../../lib/tokenUtil");
const { verifyPassword } = require("../../lib/passwordUtil");

async function performLogin(email, password) {
  try {
    const user = await findUser(email);
    if (!user) {
      return new Error("회원가입 하세요");
    }
    if (!password) {
      return new Error("비밀번호를 입력해주세요");
    }

    //비밀번호 검증
    const isPasswordValid = await verifyPassword(
      password,
      user.salt,
      user.password
    );
    if (!isPasswordValid) {
      return new Error("비밀번호가 틀립니다");
    }

    return true;
  } catch (err) {
    return err;
  }
}

async function Login(email, password, nick) {
  try {
    const isLoginSuccessful = await performLogin(email, password);

    if (isLoginSuccessful instanceof Error) throw isLoginSuccessful;
    if (isLoginSuccessful) {
      const token = tokenUtil.makeToken(email, nick);
      return token;
    }
    throw new Error("로그인 실패");
  } catch (err) {
    throw err;
  }
}

module.exports = Login;
