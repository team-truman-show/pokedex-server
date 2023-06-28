const superagent = require("superagent"); // superagent 모듈을 import합니다.
const Pokemon = require("../models/pokemons"); // Pokemon 모델을 import합니다.
const Evolve = require("../models/evolves"); // Evolve 모델을 import합니다.

// 주어진 포켓몬 ID의 진화 체인을 재귀적으로 탐색하는 함수입니다.
// pokeid는 현재 포켓몬의 ID를 나타냅니다.
async function recursive(id, x, a, pokeid) {
  if (a === true) {
    if (!x.species.url) return null;
    const evolveId = Number(x.species.url.split("/")[6]);
    // Evolve 모델에 pokeid와 evolve_id 값을 가진 레코드를 생성합니다.
    await Evolve.create({ pokeid, evolve_id: evolveId });
    return evolveId;
  }

  const y = Number(x.species.url.split("/")[6]);
  if (id == y) a = true;

  if (!x.evolves_to[0]) return null;

  if (x.evolves_to.length >= 2) {
    const evolveIds = x.evolves_to.map((evolve) =>
      Number(evolve.species.url.split("/")[6])
    );
    for (const evolveId of evolveIds) {
      // Evolve 모델에 pokeid와 evolve_id 값을 가진 레코드를 생성합니다.
      await Evolve.create({ pokeid, evolve_id: evolveId });
    }
    return recursive(id, x.evolves_to[0], a, pokeid);
  }

  return recursive(id, x.evolves_to[0], a, pokeid);
}

// 주어진 포켓몬 ID에 대한 정보를 검색하는 함수입니다.
async function Pokeidsearch(id) {
  try {
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

    // PokeAPI에서 포켓몬의 종류(species)와 세부 정보(pokemon)를 가져옵니다.
    const speciesResponse = await superagent.get(speciesUrl);
    const pokemonResponse = await superagent.get(pokemonUrl);

    let name,
      feature,
      description,
      type1,
      type2,
      imageurl,
      imagegif,
      capture_rate,
      evolution_url,
      nextevolves,
      possibility;

    // 포켓몬의 이름을 가져옵니다.
    for (let i = 0; i < speciesResponse.body.names.length; i++) {
      if (speciesResponse.body.names[i].language.name === "ko") {
        name = speciesResponse.body.names[i].name;
        break;
      }
    }

    // 포켓몬의 특징(일반적인 설명)을 가져옵니다.
    for (let i = 0; i < speciesResponse.body.genera.length; i++) {
      if (speciesResponse.body.genera[i].language.name === "ko") {
        feature = speciesResponse.body.genera[i].genus;
        break;
      }
    }

    // 포켓몬의 설명을 가져옵니다.
    for (let i = 0; i < speciesResponse.body.flavor_text_entries.length; i++) {
      if (speciesResponse.body.flavor_text_entries[i].language.name === "ko") {
        description = speciesResponse.body.flavor_text_entries[i].flavor_text;
        break;
      }
    }

    // 포켓몬의 타입을 가져옵니다.
    type1 = pokemonResponse.body.types[0].type.name;
    if (pokemonResponse.body.types[1]) {
      type2 = pokemonResponse.body.types[1].type.name;
    }

    // 포켓몬의 이미지 URL을 가져옵니다.
    imageurl =
      pokemonResponse.body.sprites.other["official-artwork"].front_default;
    imagegif =
      pokemonResponse.body.sprites.versions["generation-v"]["black-white"]
        .animated.front_default;

    // 포켓몬의 포획률을 가져옵니다.
    capture_rate = speciesResponse.body.capture_rate;

    // 포켓몬의 진화 정보 URL을 가져옵니다.
    evolution_url = Number(
      speciesResponse.body.evolution_chain.url.split("/")[6]
    );

    const evolutionChainUrl = `https://pokeapi.co/api/v2/evolution-chain/${evolution_url}/`;
    const evolutionChainResponse = await superagent.get(evolutionChainUrl);

    const little = Number(
      evolutionChainResponse.body.chain.species.url.split("/")[6]
    );
    possibility = false;

    if (little === id) {
      possibility = true;
    }

    // 포켓몬의 다음 진화 정보를 재귀적으로 탐색합니다.
    nextevolves = await recursive(
      id,
      evolutionChainResponse.body.chain,
      false,
      id
    );

    // 포켓몬 정보를 객체로 구성하여 반환합니다.
    const result = {
      name: name,
      feature: feature,
      description: description,
      type1: type1,
      type2: type2,
      imageurl: imageurl,
      imagegif: imagegif,
      capture_rate: capture_rate,
      evolution_url: evolution_url,
      nextevolves: nextevolves,
      possibility: possibility,
    };

    return result;
  } catch (err) {
    return err;
  }
}

async function Pokemonidsearch(id) {
  try {
    const pokemon = await Pokemon.findOne({
      where: { id: id },
    });
    if (!pokemon) return new Error("일치하는 포켓몬이 없습니다.");
    const result = {
      id: pokemon.dataValues.id,
      name: pokemon.dataValues.name,
      feature: pokemon.dataValues.feature,
      description: pokemon.dataValues.description,
      type1: pokemon.dataValues.type1,
      type2: pokemon.dataValues.type2,
      imageurl: pokemon.dataValues.imageurl,
      imagegif: pokemon.dataValues.imagegif,
      evolution_url: pokemon.dataValues.evolution_url,
    };
    return result;
  } catch (err) {
    return err;
  }
}

module.exports = { Pokeidsearch, Pokemonidsearch };
