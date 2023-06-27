const { sequelize } = require("./connection");
const User = require("./users");
const Pokemon = require("./pokemons");
const Mypokemon = require("./mypokemons");
const Evolve = require("./evolves");

const db = {};

db.sequelize = sequelize;

db.User = User;
db.Pokemon = Pokemon;
db.Mypokemon = Mypokemon;
db.Evolve = Evolve;

User.init(sequelize);
Pokemon.init(sequelize);
Mypokemon.init(sequelize);
Evolve.init(sequelize);

User.associate(db);
Pokemon.associate(db);
Mypokemon.associate(db);
Evolve.associate(db);

module.exports = db;
