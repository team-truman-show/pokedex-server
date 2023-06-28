const { randomBytes, pbkdf2 } = require('crypto');
const { promisify } = require('util');

const randomBytesPromise = promisify(randomBytes);
const pbkdf2Promise = promisify(pbkdf2);
//암호화
const createSalt = async () => {
  const buf = await randomBytesPromise(64);
  return buf.toString('base64');
};

const createCryptoPassword = async (password) => {
  const salt = await createSalt();
  const key = await pbkdf2Promise(password, salt, 10000, 64, 'sha512');
  const hashedPassword = key.toString('base64');

  return { hashedPassword, salt };
};
//검증
const verifyPassword = async (password, userSalt, userPassword) => {
  const key = await pbkdf2Promise(password, userSalt, 10000, 64, 'sha512');
  const hashedPassword = key.toString('base64');
  return hashedPassword === userPassword ? true : false;
};

module.exports = { createCryptoPassword, verifyPassword };
