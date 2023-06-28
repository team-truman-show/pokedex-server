const { Mypokemon } = require('../../models/index');

async function Mypokemoninfo(userid) {
  try {
    const mypokemon = await Mypokemon.findAndCountAll({
      where: { userid: userid },
    });
    if (!mypokemon) return new Error('잡은 포켓몬이 없습니다');
    return mypokemon.rows;
  } catch (err) {
    return err;
  }
}

module.exports = Mypokemoninfo;
