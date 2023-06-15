const User = require("../models/users");
const { createCryptoPassword } = require("../lib/passwordUtil");

async function change(nickname, userid, newPassword) {
  try {
    const exUser = await User.findOne({ where: { userid, nickname } });

    if (!exUser) {
      throw new Error("일치하지 않는 id 닉네임입니다");
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

module.exports = change;
