const { findUser } = require("../../dao/userDao/joinDao");
async function userSearch(email) {
  try {
    const user = await findUser(email);
    if (!user) throw new Error("일치하는 유저 정보가 없습니다.");
    return user;
  } catch (err) {
    return err;
  }
}

module.exports = userSearch;
