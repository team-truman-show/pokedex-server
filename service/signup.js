const express = require("express");
const cryptoPassword = require("../lib/passworddUtil");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const exUser = await User.findOne({
      where: { userid: req.body.userid },
    });
    if (exUser) {
      return res.status(400).redirect("이미 있는 아이디입니다");
    }

    await User.create({
      userid: req.body.userid,
      password: cryptoPassword(req.body.password),
      nickname: req.body.nickname,
    });
    res.status(200), json({ message: "회원가입 성공" });
  } catch (err) {
    console.error("err", err);
  }
});

module.exports = router;
