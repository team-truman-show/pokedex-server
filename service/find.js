const User = require("../models/users");
const { createSalt, createCryptoPassword } = require("../lib/passwordUtil");

async function change(nickname, id, newPassword) {
  try {
    const exUser = await User.findOne({ where: { id, nickname } });

    if (!exUser) {
      if (exUser.nickname !== nickname) {
        throw new Error("일치하지 않는 닉네임입니다");
      }

      if (exUser.id !== id) {
        throw new Error("일치하지 않는 아이디입니다");
      }
    }
    const salt = await createSalt();
    const { hashedPassword } = await createCryptoPassword(newPassword, salt);

    exUser.password = hashedPassword;
    exUser.salt = salt;

    await exUser.save();

    return { message: "비밀번호 변경 성공" };
  } catch (err) {
    return err.message;
  }
}

module.exports = change;
