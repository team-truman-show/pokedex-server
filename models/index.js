const { sequelize } = require('./connection');
const User = require('./users');
const Pokemon = require('./pokemons');
const Mypokemon = require('./mypokemons');

const db = {};

db.sequelize = sequelize;

db.User = User;
db.Pokemon = Pokemon;
db.Mypokemon = Mypokemon;

User.init(sequelize);
Pokemon.init(sequelize);
Mypokemon.init(sequelize);

User.associate(db);
Pokemon.associate(db);
Mypokemon.associate(db);

module.exports = db;
