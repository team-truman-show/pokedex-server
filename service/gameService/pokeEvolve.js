const { Mypokemon, Pokemon, User } = require('../../models/index');

async function pokeEvolve(mypokeid, pokeid) {
  try {
    const pokemon = await Pokemon.findOne({
      where: { id: pokeid },
    });
    const nextevolves = pokemon.nextevolves;
    if (!nextevolves) throw new Error('진화를 할 수 없는 포켓몬이다.');
    await Mypokemon.update(
      {
        pokeid: nextevolves,
        clean: 50,
        full: 50,
        intimate: 50,
      },
      { where: { id: mypokeid } }
    );

    const mypokemon = Mypokemon.findOne({
      where: { id: mypokeid },
    });
    return mypokemon;
  } catch (err) {
    return err;
  }
}

module.exports = pokeEvolve;
