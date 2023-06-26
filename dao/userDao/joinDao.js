const User = require("../../models/users");
//유저찾기
async function findUser(email) {
  try {
    const exUser = await User.findOne({
      where: { email: email },
    });

    return exUser;
  } catch (err) {
    throw new Error("찾기실패", err);
  }
}
//유저생성
async function createUser(user) {
  try {
    const createUser = await User.create(user);
    return createUser;
  } catch (err) {
    throw new Error("생성실패", err);
  }
}
//닉네임 찾기
async function findNick(nick) {
  try {
    const exNick = await User.findOne({
      where: { nick: nick },
    });
    return exNick;
  } catch (err) {
    throw new Error("찾기실패", err);
  }
}

//이메일과 닉네임찾기
async function find(email, nick) {
  try {
    const exPassword = await User.findOne({
      where: { email: email, nick: nick },
    });
    return exPassword;
  } catch (err) {
    throw new Error("찾기실패", err);
  }
}

module.exports = { findUser, createUser, findNick, find };
