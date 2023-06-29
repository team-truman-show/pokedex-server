const { Mypokemon } = require('../../models/index');

async function pokeLetGo(mypokeid) {
  try {
    const mypokemon = await Mypokemon.findOne({
      where: { id: mypokeid },
    });
    if (!mypokemon) throw new Error('해당 포켓몬 없습니다.');

    Mypokemon.destroy({ where: { id: mypokeid } });

    return '놓아주기 성공';
  } catch (err) {
    return err;
  }
}

module.exports = pokeLetGo;
