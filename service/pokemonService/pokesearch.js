const Pokemon = require("../../models/pokemons");

async function search(name) {
  try {
    const pokemon = await Pokemon.findOne({ where: { name } });

    if (!pokemon) {
      throw new Error("없는 포켓몬 입니다");
    }

    return pokemon;
  } catch (err) {
    return err.message;
  }
}
async function searchAll() {
  try {
    const pokemons = await Pokemon.findAll({});
    return pokemons;
  } catch (err) {
    return err.message;
  }
}

module.exports = { search, searchAll };
