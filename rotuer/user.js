const express = require("express");
const router = express.Router();
const login = require("../service/userService/login");
const signup = require("../service/userService/join");
const { nickChange, pwChange } = require("../service/userService/infoUpdate");
const userSearch = require("../service/userService/userSearch");
const { isLoggedIn } = require("../lib/loginUtil");
const tokenUtil = require("../lib/tokenUtil");

//회원가입
router.post("/signup", (req, res) => {
  signup(req.body)
    .then((token) => {
      if (token instanceof Error) throw token;
      res.status(200).json(token);
    })
    .catch((err) => {
      res.status(401).json({ error: err.message });
    });
});
//로그인;
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then((result) => {
      if (result instanceof Error) throw result;
      res.set("token", result);
      res.status(200).json({ token: result });
    })
    .catch((err) => {
      res.status(401).json({ error: err.message });
    });
});

//닉네임 변경
router.patch("/nickchange", isLoggedIn, (req, res) => {
  const email = req.body.email;
  const newnick = req.body.nick;
  nickChange(email, newnick)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json({ error: err.message });
    });
});
//비밀번호 찾기(변경)
router.patch("/myPwchange", async (req, res) => {
  const { email, nick, newPassword } = req.body;

  try {
    const result = await pwChange(email, nick, newPassword);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

//로그인 검증해서 이메일이랑 닉네임 보여주기
router.get("/myinformation", isLoggedIn, async (req, res) => {
  try {
    const token = req.headers.authorization?.substring(7);
    const { email, nick, id } = await userSearch(
      tokenUtil.verifyToken(token).email
    );
    res.status(200).json({ id, email, nick });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;
