const superagent = require("superagent");
const Pokemon = require("../models/pokemons");

async function recursive(id, x, a) {
  if (a === true) {
    if (!x.species.url) return null;
    // return x.species.url.split("/")[6] - "0";
    return Number(x.species.url.split("/")[6]);
  }

  //   const y = x.species.url.split("/")[6] - "0";
  const y = Number(x.species.url.split("/")[6]);
  if (id == y) a = true;

  if (!x.evolves_to[0]) return null;
  //   if (x.evolves_to.length >= 2)
  //     return recursive(
  //       id,
  //       x.evolves_to[Math.floor(Math.random() * x.evolves_to.length)],
  //       a
  //     );
  //   return recursive(id, x.evolves_to[0], a);
  if (x.evolves_to.length >= 2) {
    const randomIndex = Math.floor(Math.random() * x.evolves_to.length);
    return recursive(id, x.evolves_to[randomIndex], a);
  }

  return recursive(id, x.evolves_to[0], a);
}

async function Pokeidsearch(id) {
  try {
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

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

    for (let i = 0; i < speciesResponse.body.names.length; i++) {
      if (speciesResponse.body.names[i].language.name === "ko") {
        name = speciesResponse.body.names[i].name;
        break;
      }
    }

    for (let i = 0; i < speciesResponse.body.genera.length; i++) {
      if (speciesResponse.body.genera[i].language.name === "ko") {
        feature = speciesResponse.body.genera[i].genus;
        break;
      }
    }

    for (let i = 0; i < speciesResponse.body.flavor_text_entries.length; i++) {
      if (speciesResponse.body.flavor_text_entries[i].language.name === "ko") {
        description = speciesResponse.body.flavor_text_entries[i].flavor_text;
        break;
      }
    }

    type1 = pokemonResponse.body.types[0].type.name;
    if (pokemonResponse.body.types[1]) {
      type2 = pokemonResponse.body.types[1].type.name;
    }

    imageurl =
      pokemonResponse.body.sprites.other["official-artwork"].front_default;
    imagegif =
      pokemonResponse.body.sprites.versions["generation-v"]["black-white"]
        .animated.front_default;

    capture_rate = speciesResponse.body.capture_rate;
    evolution_url =
      //   speciesResponse.body.evolution_chain.url.split("/")[6] - "0";
      Number(speciesResponse.body.evolution_chain.url.split("/")[6]);

    const evolutionChainUrl = `https://pokeapi.co/api/v2/evolution-chain/${evolution_url}/`;
    const evolutionChainResponse = await superagent(evolutionChainUrl);

    // let little = evolutionChainResponse.body.chain.species.url.split("/")[6];
    const little = Number(
      evolutionChainResponse.body.chain.species.url.split("/")[6]
    );
    possibility = false;

    if (little === id) {
      possibility = true;
    }

    nextevolves = await recursive(id, evolutionChainResponse.body.chain, false);

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

// async function Pokenamesearch(name){
//     try{
//     let flag = 0;
//     let index = 0;
//     let speciesUrl;
//     let speciesResponse;
//     for(let i = 1; i <= 1010; i++)
//     {
//         speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
//         speciesResponse = await superagent.get(speciesUrl);
//         for(let j = 0; j < speciesResponse.body.names.length; j++)
//         {
//             if(speciesResponse.body.names[j].name === name)
//             {
//                 flag = 1;
//                 index = i;
//                 break;
//             }
//         }
//         if(flag === 1)
//         break;
//     }
//     if(flag === 0)
//         return false;
//     speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${index}`;
//     const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${index}`
//     speciesResponse = await superagent.get(speciesUrl);
//     const pokemonResponse = await superagent.get(pokemonUrl);
//     let feature, description,type1,type2,imageurl;
//     for(let i = 0; i < speciesResponse.body.genera.length; i++)
//     if(speciesResponse.body.genera[i].language.name === "ko"){
//         feature = speciesResponse.body.genera[i].genus;
//         break;
//     }
//     for(let i = 0; i < speciesResponse.body.flavor_text_entries.length; i++)
//     if(speciesResponse.body.flavor_text_entries[i].language.name === "ko")
//     {
//         description = speciesResponse.body.flavor_text_entries[i].flavor_text;
//         break;
//     }
//     type1 = pokemonResponse.body.types[0].type.name;
//     if(pokemonResponse.body.types[1])
//         type2 = pokemonResponse.body.types[1].type.name;
//     imageurl = pokemonResponse.body.sprites.other['official-artwork'].front_default;
//     const result = {
//         name: name,
//         feature : feature,
//         description : description,
//         type1 : type1,
//         type2 : type2,
//         imageurl : imageurl
//     }
//     return result;
// } catch(err) {
//     return err;
// }
// }

module.exports = { Pokeidsearch, Pokemonidsearch };
