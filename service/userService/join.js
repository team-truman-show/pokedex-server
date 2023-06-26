const { createCryptoPassword } = require("../../lib/passwordUtil");

const { findUser, createUser } = require("../../dao/userDao/joinDao");
//회원가입
async function Signup(param) {
  try {
    const { email, password, nick } = param;

    const user = await findUser(email);
    if (user) {
      throw new Error("이미 있는 아이디입니다.");
    }

    if (!email || !password || !nick) {
      throw new Error("모든 값을 입력해주세요.");
    }

    //암호화
    const { hashedPassword, salt } = await createCryptoPassword(
      String(password)
    );

    const exUser = await createUser({
      email: email,
      password: hashedPassword,
      salt: salt,
      nick: nick,
    });

    return { message: "회원가입성공" };
  } catch (err) {
    return err;
  }
}

module.exports = Signup;
