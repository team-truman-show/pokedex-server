const superagent = require('superagent');
const Pokemon = require('../models/pokemons');

async function Pokeidsearch(id){
    try{
        const url1 = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
        const url2 = `https://pokeapi.co/api/v2/pokemon/${id}`
        const response1 = await superagent.get(url1);
        const response2 = await superagent.get(url2);
        let name, feature,description,type1,type2,imageurl,imagegif;
        for(let i = 0; i < response1.body.names.length; i++)
        if(response1.body.names[i].language.name === "ko"){
        name = response1.body.names[i].name;
        break;
        }
        for(let i = 0; i < response1.body.genera.length; i++)
        if(response1.body.genera[i].language.name === "ko"){
            feature = response1.body.genera[i].genus;
            break;
        }
        for(let i = 0; i < response1.body.flavor_text_entries.length; i++)
        if(response1.body.flavor_text_entries[i].language.name === "ko")
        {
            description = response1.body.flavor_text_entries[i].flavor_text;
            break;
        }
        type1 = response2.body.types[0].type.name;
        if(response2.body.types[1])
            type2 = response2.body.types[1].type.name;
        imageurl = response2.body.sprites.other['official-artwork'].front_default;
        imagegif = response2.body.sprites.versions['generation-v']['black-white'].animated.front_default;
        const result = {
            name: name,
            feature : feature,
            description : description,
            type1 : type1,
            type2 : type2,
            imageurl : imageurl,
            imagegif : imagegif
        }
        return result;
    } catch(err) {
        return err;
    }
}

async function Pokemonidsearch(id){
    try{
        const pokemon = await Pokemon.findOne({
            where: { id: id }
        });
        if(!pokemon)
            return new Error("일치하는 포켓몬이 없습니다.");
        const result = {id : pokemon.dataValues.id,
            name : pokemon.dataValues.name,
            feature : pokemon.dataValues.feature,
            description : pokemon.dataValues.description,
            type1: pokemon.dataValues.type1,
            type2: pokemon.dataValues.type2,
            imageurl: pokemon.dataValues.imageurl
        }
        return result;
    } catch(err){
        return err;
    }
}

// async function Pokenamesearch(name){
//     try{
//     let flag = 0;
//     let index = 0;
//     let url1;
//     let response1;
//     for(let i = 1; i <= 1010; i++)
//     {
//         url1 = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
//         response1 = await superagent.get(url1);
//         for(let j = 0; j < response1.body.names.length; j++)
//         {
//             if(response1.body.names[j].name === name)
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
//     url1 = `https://pokeapi.co/api/v2/pokemon-species/${index}`;
//     const url2 = `https://pokeapi.co/api/v2/pokemon/${index}`
//     response1 = await superagent.get(url1);
//     const response2 = await superagent.get(url2);
//     let feature, description,type1,type2,imageurl;
//     for(let i = 0; i < response1.body.genera.length; i++)
//     if(response1.body.genera[i].language.name === "ko"){
//         feature = response1.body.genera[i].genus;
//         break;
//     }
//     for(let i = 0; i < response1.body.flavor_text_entries.length; i++)
//     if(response1.body.flavor_text_entries[i].language.name === "ko")
//     {
//         description = response1.body.flavor_text_entries[i].flavor_text;
//         break;
//     }
//     type1 = response2.body.types[0].type.name;
//     if(response2.body.types[1])
//         type2 = response2.body.types[1].type.name;
//     imageurl = response2.body.sprites.other['official-artwork'].front_default;
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

module.exports = {Pokeidsearch, Pokemonidsearch};