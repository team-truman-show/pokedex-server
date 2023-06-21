const User = require("../models/users");
const { createCryptoPassword } = require("../lib/passwordUtil");

async function pwChange(nick, email, newPassword) {
  try {
    const exUser = await User.findOne({ where: { email, nick } });
    if (!exUser) {
      throw new Error("일치하지 않는 email과 닉네임입니다");
    }

    const { hashedPassword, salt } = await createCryptoPassword(newPassword);

    exUser.password = hashedPassword;
    exUser.salt = salt;

    await exUser.save();

    return { message: "비밀번호 변경 성공" };
  } catch (err) {
    return err.message;
  }
}


async function nickChange(email, newnick) {
  try {
    const exUser = await User.findOne({
    where: { email: email },
  });
    if (!exUser) {
      throw new Error("일치하지 않는 email입니다");
    }

    if (!newnick) {
      throw new Error("닉네임을 적어주세요");
    }
    exUser.nick = newnick; // 닉네임을 새로운 닉네임으로 변경
    await exUser.save(); // 변경사항 저장
    return { message: "닉네임변경 성공" };
  } catch (err) {
    return err.message;
  }
}

module.exports = {nickChange,pwChange};
