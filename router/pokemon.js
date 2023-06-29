
const express = require("express");
const router = express.Router();
const { search, searchAll } = require("../service/pokemonService/pokesearch");
const { PokeEvolveSearch } = require("../service/evolveService/evolve");
const { isLoggedIn } = require("../lib/loginUtil");
const { Pokeidsearch, Pokemonidsearch } = require("../API/pokeapi");

//포켓몬 id 검색
router.get("/idsearch", isLoggedIn, (req, res) => {
  Pokeidsearch(req.query.id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(401).json({ error: error.message });
    });
});

//포켓몬 전체조회
router.get("/page", isLoggedIn, async (req, res) => {
  try {
    searchAll().then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

//db에 id로 포켓몬 검색
router.get("/dbidsearch", isLoggedIn, (req, res) => {
  Pokemonidsearch(req.query.id)
    .then((result) => {
      if (result instanceof Error) throw result;
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(401).json({ error: err.message });
    });
});
//db에 이름으로 포켓몬 검색
router.get("/namesearch", isLoggedIn, async (req, res) => {
  try {
    const name = req.query.name;
    const result = await search(name);

    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get("/evolve-search", isLoggedIn, async (req, res) => {
  try {
    const pokeid = req.query.pokeid;
    const result = await PokeEvolveSearch(pokeid);

    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/evolve', isLoggedIn, async (req, res) => {
  try {
    const pokeid = req.query.pokeid;
    const mypokeid = req.query.mypokeid;
    const result = await PokeEvolve(pokeid, mypokeid);

    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
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

module.exports = { router };
