const { User, Pokemon, Mypokemon } = require('../models/index');

async function catchPoke(userid, pokeid) {
  try {
    const user = await User.findOne({
      where: { id: userid },
    });
    if (!user)
      return new Error("유저 정보를 찾을 수 없습니다");
    const pokemon = await Pokemon.findOne({
      where: { id: pokeid },
    });
    if (!pokemon)
      return new Error("정확한 포켓몬이 아닙니다.");
    const existingPokemon = await Mypokemon.findOne({
      where: {
        userid: userid,
        pokeid: pokeid,
      },
    });
    if (existingPokemon) {
      return new Error("이미 보유한 포켓몬입니다.");
    }
    const num = pokemon.capture_rate / 255;
    const user_num = Math.random();
      if (num < user_num) {
        throw new Error(`${Math.floor(num * 100)}% 확률 잡기 실패!`);
      }

    await Mypokemon.create({
      userid: userid,
      pokeid: pokeid,
    });

    return "잡기 성공";
  } catch (err) {
    return err;
  }
};


module.exports = {catchPoke};
