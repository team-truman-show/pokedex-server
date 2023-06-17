const Pokemon = require("../models/pokemons");

async function searchAll() {
  try {
    const pokemons = await Pokemon.findAll({
      // attributes: { exclude: ["imagegif"] },
      //attributes-조회할 지정   exclude-제외
    });

    return pokemons;
  } catch (err) {
    return err.message;
  }
}

module.exports = searchAll;
