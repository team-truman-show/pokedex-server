
const {createCryptoPassword} = require("../lib/passwordUtil");
const User = require("../models/users");

async function signup(param){
  try{
  const {userid, password, nickname} = param;
    const exUser = await User.findOne({
      where: { userid: userid },
    });
    if (exUser) {
      throw new Error("이미 있는 아이디입니다.");
    }
    if (!userid || !password || !nickname) {
      throw new Error("모든 값을 입력해주세요");
    }

    const { hashedPassword, salt } = await createCryptoPassword(
      String(password)
    );

    await User.create({
      userid: userid,
      password: hashedPassword,
      salt: salt,
      nickname: nickname,
    });

    return "성공";
  } catch (err) {
    return err;
  }
};

module.exports = signup;
