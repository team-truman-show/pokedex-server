const { pbkdf2 } = require("crypto");
const { promisify } = require("util");

const pbkdf2Promise = promisify(pbkdf2);

const verifyPassword = async (password, userSalt, userPassword) => {
  const key = await pbkdf2Promise(password, userSalt, 10000, 64, "sha512");
  const hashedPassword = key.toString("base64");
  if (hashedPassword === userPassword) return true;
  return false;
};

module.exports = verifyPassword;
