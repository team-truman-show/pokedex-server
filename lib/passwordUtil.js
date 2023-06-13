const { randomBytes, pbkdf2 } = require("crypto");
const { promisify } = require("util");

const randomBytesPromise = promisify(randomBytes);
const pbkdf2Promise = promisify(pbkdf2);

const createSalt = async () => {
  const buf = await randomBytesPromise(64);
  return buf.toString("base64");
};

const createCryptoPassword = async (password) => {
  const salt = await createSalt();
  const key = await pbkdf2Promise(password, salt, 10000, 64, "sha512");
  const hashedPassword = key.toString("base64");

  return { hashedPassword, salt };
};

module.exports = createCryptoPassword;
