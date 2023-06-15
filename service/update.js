const User = require("../models/users");

async function update(userid, newNickname) {
  try {
    const exUser = await User.findOne({ where: { id: userid } });

    if (!exUser) {
      throw new Error("일치하지 않는 id입니다");
    }

    if (!newNickname) {
      throw new Error("닉네임을 적어주세요");
    }

    exUser.nickname = newNickname; // 닉네임을 새로운 닉네임으로 변경
    await exUser.save(); // 변경사항 저장

    return { message: "닉네임변경 성공" };
  } catch (err) {
    return err.message;
  }
}

module.exports = update;
