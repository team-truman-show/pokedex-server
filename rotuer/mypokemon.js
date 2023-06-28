const express = require('express');
const router = express.Router();
const userSearch = require('../service/userService/userSearch');
const { catchPoke } = require('../service/mypokemonService/pokeCatch');
const Mypokemoninfo = require('../service/mypokemonService/mypokemon');
const tokenUtil = require('../lib/tokenUtil');
const findPokemon = require('../service/mypokemonService/findPokemon');
const { isLoggedIn } = require('../lib/loginUtil');
//포켓몬 잡으면 mypokemondb에 저장
router.post('/catchpoke', isLoggedIn, async (req, res) => {
  try {
    const tokenbearer = req.headers.authorization;
    const token = tokenbearer.substring(7);
    const useremail = tokenUtil.verifyToken(token).email;
    console.log(useremail);
    const user = await userSearch(useremail);
    const userid = user.id;
    const pokeid = req.body.pokeid;
    const result = await catchPoke(userid, pokeid);
    if (result instanceof Error) throw result;
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});
//내가 잡은 포켓몬들 보여주기
router.get('/mypokemon', isLoggedIn, async (req, res) => {
  try {
    const tokenbearer = req.headers.authorization;
    const token = tokenbearer.substring(7);
    const myemail = tokenUtil.verifyToken(token).email;
    const user = await userSearch(myemail);
    const myid = user.id;
    const pokemons = await Mypokemoninfo(myid);
    const result = [];
    for (let i = 0; i < pokemons.length; i++) {
      const item = pokemons[i];
      result.push({
        id: item.id,
        pokeid: item.pokeid,
      });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/bringUp', isLoggedIn, async (req, res) => {
  try {
    const tokenbearer = req.headers.authorization;
    const token = tokenbearer.substring(7);
    const myemail = tokenUtil.verifyToken(token).email;
    const user = await userSearch(myemail);
    const myid = user.id;
    const mypokemon = await findPokemon(myid, req.query.id);
    res.status(200).json(mypokemon);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;
