const express = require("express");
const router = express.Router();
const login = require("../service/login");
const signup = require("../service/join");
const update = require("../service/update");
const change = require("../service/pwchange");
const {isLoggedIn} = require('../lib/loginUtil');
const tokenUtil = require('../lib/tokenUtil');
const informSearch = require('../service/myinformation');
const Mypokemoninfo = require('../service/mypokemon');
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

//로그인 검증해서 이메일이랑 닉네임 보여주기
router.get('/myinformation',isLoggedIn,async (req,res) => {
    try{
        const tokenbearer = req.headers.authorization;
        const token = tokenbearer.substring(7);
        const myemail = tokenUtil.verifyToken(token).email;
        const myinfo = await informSearch(myemail);
        const mynick = myinfo.nick;
        const myid = myinfo.id;
        const result = {id: myid ,email: myemail, nick: mynick};
        console.log(result);
        res.status(200).json(result);
    } catch(err) {
        res.status(401).send(err.message);
    }
})
//내가 잡은 포켓몬들 보여주기
router.get('/mypokemon',isLoggedIn,async (req,res) => {
    try{
        const tokenbearer = req.headers.authorization;
        const token = tokenbearer.substring(7);
        const myemail = tokenUtil.verifyToken(token).email;
        const myinfo = await informSearch(myemail);
        const myid = myinfo.id;
        const pokemons = await Mypokemoninfo(myid);
        const pokeIds = pokemons.map(item => item.pokeid);
        res.status(200).json(pokeIds);
    }catch(err){
        res.status(401).send(err.message);
    }
})
module.exports = router;
