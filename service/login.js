const express = require("express");
const router = express.Router();
const User = require("../models/users");
const tokenUtil = require("../lib/tokenUtil");
const verifyPassword = require("../lib/verifyUtil");

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { userid, password } = req.body;

  async function performLogin(userid, password) {
    try {
      const user = await User.findOne({
        where: { userid: userid },
      });

      if (!user) {
        throw new Error("아이디가 없습니다!");
      }
      // console.log(user.salt, user.password, password);
      const isPasswordValid = await verifyPassword(
        password,
        user.salt,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error("비밀번호가 틀립니다!");
      }

      return true;
    } catch (err) {
      throw err;
    }
  }

  try {
    const isLoginSuccessful = await performLogin(userid, password);

    if (isLoginSuccessful) {
      const token = tokenUtil.makeToken(userid);
      res.set("token", token);
      return res.status(200).json({ token });
    }
  } catch (err) {
    return res.status(500).send(err.toString());
  }
});

module.exports = router;
