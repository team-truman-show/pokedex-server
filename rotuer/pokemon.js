const express = require("express");
const router = express.Router();
const {search,searchAll} = require("../service/pokeSearch");
const { isLoggedIn } = require("../lib/loginUtil");
const {catchPoke} = require('../service/pokeCatch');
const { Pokeidsearch, Pokemonidsearch } = require("../service/pokeApi");
const Pokemon = require("../models/pokemons");
const tokenUtil = require('../lib/tokenUtil');
const Idfind = require('../service/idSearch');
//api 불러오기,api id 검색
router.get("/idsearch",isLoggedIn, (req, res) => {
  Pokeidsearch(req.query.id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
        res.status(401).json({ error: error.message });
    });
});
//db에 저장
async function save() {
  for (let i = 387; i <= 493; i++) {
    try {
      const result = await Pokeidsearch(i);
      // console.log(result.name);
      await Pokemon.create({
        id: i,
        name: result.name,
        feature: result.feature,
        description: result.description,
        type1: result.type1,
        type2: result.type2,
        imageurl: result.imageurl,
        imagegif: result.imagegif,
        hp:result.hp
      });
    } catch (err) {
      console.error(err);
    }
  }
}
//포켓몬 전체조회
router.get("/page",isLoggedIn, async (req, res) => {
  try {
    searchAll().then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(401).json({ error : err.message });
  }
});

//db에 id로 포켓몬 검색
router.get("/dbidsearch",isLoggedIn, (req, res) => {
  Pokemonidsearch(req.query.id)
    .then((result) => {
      if (result instanceof Error) throw result;
      res.status(200).send(result);
    })
    .catch((err) => {
        res.status(401).json({ error : err.message });
    });
});
//db에 이름으로 포켓몬 검색
router.get("/namesearch",isLoggedIn, async (req, res) => {
  try {
    const name = req.query.name;
    const result = await search(name);

    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error : err.message });
  }
});

//이름으로 api 검색
// router.post('/namesearch',(req,res) => {
//     pokeapi.Pokenamesearch(req.body.name).then(result =>{
//         res.status(200).send(result);
//     }).catch(err => {
//         res.status(401).send(err);
//     })
// })
//포켓몬 잡으면 mypokemondb에 저장
router.post("/catchpoke", isLoggedIn, async (req, res) => {
    try {
      const tokenbearer = req.headers.authorization;
      const token = tokenbearer.substring(7);
      const useremail = tokenUtil.verifyToken(token).email;
      const userid = await Idfind(useremail);
      const pokeid = req.body.pokeid;
      const result = await catchPoke(userid, pokeid);
      if (result instanceof Error)
        throw result;
      res.status(200).json(result);
    } catch (err) {
    res.status(401).json({ error: err.message });
    }
  });

module.exports = { router, save };
