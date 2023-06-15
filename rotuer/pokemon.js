const express = require("express");
const router = express.Router();
const pokeapi = require("../service/pokeapi");
const Pokemon = require("../models/pokemons");
const search = require("../service/pokesearch");
//api 불러오기,id 검색
router.post("/idsearch", (req, res) => {
  pokeapi
    .Pokeidsearch(req.body.id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(401).send(err);
    });
});
//db에 저장
async function save() {
  for (let i = 1; i <= 151; i++) {
    try {
      const result = await pokeapi.Pokeidsearch(i);
      console.log(result.name);
      await Pokemon.create({
        id: i,
        name: result.name,
        feature: result.feature,
        description: result.description,
        type1: result.type1,
        type2: result.type2,
        imageurl: result.imageurl,
      });
    } catch (err) {
      console.error(err);
    }
  }
}
//이름으로 api 검색
// router.post("/namesearch", (req, res) => {
//   pokeapi
//     .Pokenamesearch(req.body.name)
//     .then((result) => {
//       res.status(200).send(result);
//     })
//     .catch((err) => {
//       res.status(401).send(err);
//     });
// });

router.post("/namesearch", async (req, res) => {
  try {
    const name = req.body.name;
    const result = await search(name);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).send(err);
  }
});

module.exports = { router, save };
