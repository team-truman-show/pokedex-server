const express = require("express");
const router = express.Router();
const search = require("../service/pokesearch");
const {Pokeidsearch, Pokemonidsearch} = require('../service/pokeapi');
const Pokemon = require('../models/pokemons');
const { isLoggedIn } = require("../lib/loginUtil");
const Catchpoke = require('../service/catch');
//api 불러오기,api id 검색
router.post('/idsearch',(req,res) =>{
    Pokeidsearch(req.body.id)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(401).send(err);
  });
});
//db에 저장
async function save() {
    for (let i = 1; i <= 151; i++) {
      try {
        const result = await Pokeidsearch(i);
        await Pokemon.create({
            id: i,
            name: result.name,
            feature: result.feature,
            description: result.description,
            type1: result.type1,
            type2: result.type2,
            imageurl: result.imageurl,
            imagegif: result.imagegif
         });
      } catch (err) {
        console.error(err);
      }
    }
  }
//db에 id로 포켓몬 검색
router.post("/dbidsearch",isLoggedIn,(req,res) => {
   Pokemonidsearch(req.body.id).then(result => {
    if(result instanceof Error)
        throw result;
    res.status(200).json(result);
}).catch(err => {
    res.status(401).send(err.message);
   })
});
//db에 이름으로 포켓몬 검색
router.post("/namesearch",isLoggedIn, async (req, res) => {
  try {
    const name = req.body.name;
    const result = await search(name);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).send(err);
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
router.get("/catchpoke",async (req,res)=>{
    try{
    const userid = req.body.userid;
    const pokeid = req.body.pokeid;
    const result = await Catchpoke(userid,pokeid);
    console.log(result);
    if(result instanceof Error)
        throw result;
        res.status(200).json(result);
    }catch(err){
        res.status(401).send(err.message);
    }
})
//모든 포켓몬 정보 불러오기
module.exports = {router,save};