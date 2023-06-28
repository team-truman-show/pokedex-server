const { User, Mypokemon, Pokemon, Evolve } = require("../../models/index");
const sequelize = require("sequelize");

async function PokemonEvolve(pokeid) {
  try {
    const evolve = await Evolve.sequelize.query(
      `SELECT ep.name as evolName, ep.id as evolId, p.name as beforeName, p.id as beforeId FROM evolves e left outer join pokemons p on p.id = e.pokeid left outer join pokemons ep on ep.id = e.evolve_id where e.id = ${pokeid};`
    );
    if (!evolve) return new Error("유저 정보를 찾을 수 없습니다");
    let result = evolve[0][0];
    return result;
  } catch (err) {
    return err;
  }
}

module.exports = { PokemonEvolve };
