const { Mypokemon } = require('../../models/index');

async function findPokemon(mypokeid) {
  try {
    const mypokemon = Mypokemon.findOne({
      where: {
        id: mypokeid,
      },
    });
    if (!mypokemon) throw new Error('포켓몬이 없습니다.');
    return mypokemon;
  } catch (err) {
    return err;
  }
}

module.exports = findPokemon;
