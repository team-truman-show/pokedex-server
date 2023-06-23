const Pokemon = require("../models/pokemons");
const { Pokeidsearch } = require("./pokeapi");
//원하는 포켓몬수만큼 db에 저장
async function save() {
  //493
  for (let i = 0; i <= 387; i++) {
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
        hp: result.hp,
      });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = { save };
