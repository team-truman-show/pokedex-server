const { createCryptoPassword } = require("../lib/passwordUtil");
const User = require("../models/users");

async function Signup(param) {
  try {
    const { email, password, nick } = param;
    const exUser = await User.findOne({
      where: { email: email },
    });
    if (exUser) {
      return new Error("이미 있는 아이디입니다.");
    }
    if (!email || !password || !nick) {
      return new Error("모든 값을 입력해주세요");
    }

    const { hashedPassword, salt } = await createCryptoPassword(
      String(password)
    );

    await User.create({
      email: email,
      password: hashedPassword,
      salt: salt,
      nick: nick,
    });

    return "회원가입 성공";
  } catch (err) {
    return err;
  }
}

module.exports = Signup;
