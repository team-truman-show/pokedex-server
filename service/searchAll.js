const Pokemon = require("../models/pokemons");

async function searchAll() {
  try {
    const pokemons = await Pokemon.findAll({

    });

    return pokemons;
  } catch (err) {
    return err.message;
  }
}

module.exports = searchAll;
