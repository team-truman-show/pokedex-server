const superagent = require('superagent');

async function Pokeapi(id){
    try{
        const url1 = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
        const url2 = `https://pokeapi.co/api/v2/pokemon/${id}`
        const response1 = await superagent.get(url1);
        const response2 = await superagent.get(url2);
        let name, feature,description,type1,type2,imgurl;
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
        imgurl = response2.body.sprites.other['official-artwork'].front_default;
        const result = {
            "id":id,
            "name": name,
            "feature": feature,
            "descriptoin": description,
            "type1": type1,
            "type2": type2,
            "imgurl": imgurl
        }
        console.log(result);
        return result;
    } catch(err) {
        return err;
    }
}

module.exports = Pokeapi