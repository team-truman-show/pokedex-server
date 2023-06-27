const { User, Pokemon, Mypokemon } = require("../../models/index");

//////////// 산책
async function Pokeclean(userid, pokeid, clean) {
  try {
    //유저조회
    const user = await User.findOne({
      where: { id: userid },
    });
    if (!user) return new Error("유저 정보를 찾을 수 없습니다");
    //포켓몬조회
    const pokemon = await Pokemon.findOne({
      where: { id: pokeid },
    });
    if (!pokemon) return new Error("정확한 포켓몬이 아닙니다.");
    //내포켓몬 조회
    const myPokemon = await Mypokemon.findOne({
      where: { userid, pokeid },
    });
    if (!myPokemon)
      return new Error("해당 유저와 포켓몬에 대한 정보를 찾을 수 없습니다.");

    myPokemon.clean = clean;
    await myPokemon.save();

    return myPokemon;
  } catch (err) {
    return err;
  }
}

//////////// 포만도
async function Pokefull(userid, pokeid, full) {
  try {
    //유저조회
    const user = await User.findOne({
      where: { id: userid },
    });
    if (!user) return new Error("유저 정보를 찾을 수 없습니다");
    //포켓몬조회
    const pokemon = await Pokemon.findOne({
      where: { id: pokeid },
    });
    if (!pokemon) return new Error("정확한 포켓몬이 아닙니다.");
    //내포켓몬 조회
    const myPokemon = await Mypokemon.findOne({
      where: { userid, pokeid },
    });
    if (!myPokemon)
      return new Error("해당 유저와 포켓몬에 대한 정보를 찾을 수 없습니다.");

    myPokemon.full = full;
    await myPokemon.save();

    return myPokemon;
  } catch (err) {
    return err;
  }
}

////////// 산책
async function Pokeintimate(userid, pokeid, intimate) {
  try {
    //유저조회
    const user = await User.findOne({
      where: { id: userid },
    });
    if (!user) return new Error("유저 정보를 찾을 수 없습니다");
    //포켓몬조회
    const pokemon = await Pokemon.findOne({
      where: { id: pokeid },
    });
    if (!pokemon) return new Error("정확한 포켓몬이 아닙니다.");
    //내포켓몬 조회
    const myPokemon = await Mypokemon.findOne({
      where: { userid, pokeid },
    });
    if (!myPokemon)
      return new Error("해당 유저와 포켓몬에 대한 정보를 찾을 수 없습니다.");

    myPokemon.intimate = intimate;
    await myPokemon.save();

    return myPokemon;
  } catch (err) {
    return err;
  }
}

module.exports = { Pokeclean, Pokefull, Pokeintimate };
