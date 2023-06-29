const superagent = require("superagent");
const Pokemon = require("../models/pokemons");
const Evolve = require("../models/evolves");
const util = require("util");

async function recursive(pokeId, chain, isResponse) {
  nextEvolves = [];
  if (isResponse === true) {
    for (let i = 0; i < chain.evolves_to.length; i++) {
      nextEvolves.push(getSpeciesId(chain.evolves_to[i]));
    }
    return nextEvolves;
  }

  if (getSpeciesId(chain) === pokeId) {
    isResponse = true;
    return recursive(pokeId, chain, isResponse);
  }

  if (!chain.evolves_to || chain.evolves_to.length === 0) return nextEvolves;

  for (let i = 0; i < chain.evolves_to.length; i++) {
    nextEvolves.push(recursive(pokeId, chain.evolves_to[i], isResponse));
    // nextEvolves.push(getSpeciesId(chain.evolves_to[i]));
    return nextEvolves;
  }
}

async function evolve() {
  const pokemons = await Pokemon.findAll({});
  for (let pokemon of pokemons) {
    const evolutionChainUrl = `https://pokeapi.co/api/v2/evolution-chain/${pokemon.evolution_url}/`;
    // console.log(`evolutionChainUrl : ${evolutionChainUrl}`);
    const evolutionChainResponse = await superagent(evolutionChainUrl);
    const nextevolves = await recursive(
      pokemon.id,
      evolutionChainResponse.body.chain,
      false,
      []
    );
    // console.log(
    //   util.inspect(nextevolves, false, null, true /* enable colors */)
    // );
    for (let i = 0; i < nextevolves.length; i++) {
      const isExistEvolve = await Evolve.findOne({
        where: {
          evolve_id: nextevolves[i],
          pokeid: pokemon.id,
        },
      });
      if (!isExistEvolve) {
        await Evolve.create({
          evolve_id: nextevolves[i],
          pokeid: pokemon.id,
        });
      }
    }
  }
}

function getSpeciesId(chain) {
  return Number(chain.species.url.split("/")[6]);
}
module.exports = { evolve };
