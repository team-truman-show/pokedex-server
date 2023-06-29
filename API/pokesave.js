const Pokemon = require('../models/pokemons');
const { Pokeidsearch } = require('./pokeapi');
//원하는 포켓몬수만큼 db에 저장
async function save() {
  for (let i = 1; i <= 1009; i++) {
    try {
      const result = await Pokeidsearch(i);
      // console.log(result.name);
      // console.log(result.posibility);
      await Pokemon.create({
        id: i,
        name: result.name,
        feature: result.feature,
        description: result.description,
        type1: result.type1,
        type2: result.type2,
        imageurl: result.imageurl,
        imagegif: result.imagegif,
        capture_rate: result.capture_rate,
        evolution_url: result.evolution_url,
        nextevolves: result.nextevolves,
        possibility: result.possibility,
      });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = { save };
