const express = require('express');
const router = express.Router();
const pokeapi = require('../service/pokeapi');
const Pokemon = require('../models/pokemons');
//api 불러오기,id 검색
router.post('/api',(req,res) =>{
    pokeapi(req.body.id)
  .then(result => {
    res.status(200).send(result);
  })
  .catch(error => {
    res.status(401).send(err);
  });
});
//db에 저장
async function save() {
    for (let i = 1; i <= 151; i++) {
      try {
        const result = await pokeapi(i);
        console.log(result.name);
        await Pokemon.create({
            id: i,
          name: result.name,
          feature: result.feature,
          description: result.description,
          type1: result.type1,
          type2: result.type2,
          imageurl: result.imageurl
         });
      } catch (err) {
        console.error(err);
      }
    }
  }
//이름으로 검색

module.exports = {router,save};