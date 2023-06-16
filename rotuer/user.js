const express = require("express");
const router = express.Router();
const login = require("../service/login");
const signup = require("../service/join");
const update = require("../service/update");
const change = require("../service/pwchange");
const {isLoggedIn} = require('../lib/loginUtil');
const tokenUtil = require('../lib/tokenUtil');
//로그인
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  login(email, password)
    .then((result) => {
      if (result instanceof Error) throw result;
      res.set("token", result);
      res.status(200).json({ token: result });
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});
//회원가입
router.post("/signup", (req, res) => {
  signup(req.body)
    .then((token) => {
      if (token instanceof Error) throw token;
      res.status(200).json(token);
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
});
//닉네임 변경
router.patch("/nickchange", isLoggedIn, (req, res) => {
  const email = req.body.email;
  const newnick = req.body.nick;
  update(email, newnick)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});
//비밀번호 찾기(변경)
router.patch("/pwchange",isLoggedIn, async (req, res) => {
  const { nick, email, newPassword } = req.body;
  try {
    const result = await change(nick, email, newPassword);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).send(err);
  }
});
//마이페이지 조회

//로그인 검증해서 이메일이랑 닉네임 보여주기
router.get('/verify',isLoggedIn,(req,res) => {
    try{

    } catch(err) {

    }
})
//잡기 버튼이 눌린다면 내 포켓몬을 저장
router.post('/catchpoke',(req,res) =>{
})
module.exports = router;
