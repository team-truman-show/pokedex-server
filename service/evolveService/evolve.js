
const { User, Mypokemon, Pokemon, Evolve } = require("../../models/index");

async function PokeEvolveSearch(pokeid) {
  try {
    const evolve = await Evolve.sequelize.query(
      `SELECT ep.name as evolName, ep.id as evolId, p.name as beforeName, p.id as beforeId FROM evolves e left outer join pokemons p on p.id = e.pokeid left outer join pokemons ep on ep.id = e.evolve_id where e.id = ${pokeid};`
    );
    if (!evolve) return new Error("유저 정보를 찾을 수 없습니다");
    let result = evolve[0][0];
    return result;
    // return evolve;
  } catch (err) {
    return err;
  }
}

async function PokeEvolve(pokeid, mypokeid) {
  try {
    // 포켓몬 조회
    const pokemon = await Pokemon.findOne({
      where: { id: pokeid },
    });
    if (!pokemon) throw new Error("포켓몬 정보를 찾을 수 없습니다");

    // 내 포켓몬 조회
    const myPokemon = await Mypokemon.findOne({
      where: { id: mypokeid },
    });
    if (!myPokemon)
      throw new Error("해당 유저와 포켓몬에 대한 정보를 찾을 수 없습니다.");
    // 내 포켓몬 업데이트 및 초기화
    myPokemon.pokeid = pokemon.nextevolves;
    myPokemon.clean = 50;
    myPokemon.full = 50;
    myPokemon.intimate = 50;

    await myPokemon.save();

    // 결과 값 출력
    console.log("🚀 ~ file: evolve.js:41 ~ PokeEvolve ~ myPokemon:", myPokemon);
    return myPokemon;
  } catch (err) {
    return err;
  }
}

module.exports = { PokeEvolveSearch, PokeEvolve };
