const express = require("express");
const router = express.Router();
const login = require("../service/login");
const signup = require("../service/signup");
const update = require("../service/update");
//로그인
router.post("/login", (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;
  login(userid, password)
    .then((result) => {
      res.set("token", result);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});
//회원가입
router.post("/signup", (req, res) => {
  signup(req.body)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});
//닉네임 변경
router.patch("/update", (req, res) => {
  const userid = req.body.userid;
  const newNickname = req.body.nickname;
  update(userid, newNickname)
    .then((result) => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});
module.exports = router;
