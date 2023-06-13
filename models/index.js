const {sequelize} = require('./connection');
const User = require('./users');
const Poketmon = require('./poketmons');
const Mypoketmon = require('./mypoketmons');
const db = {};

db.sequelize = sequelize;

db.User = User;
db.Poketmon = Poketmon;
db.Mypoketmon = Mypoketmon;

User.init(sequelize);
Poketmon.init(sequelize);
Mypoketmon.init(sequelize);

User.associate(db);
Poketmon.associate(db);
Mypoketmon.associate(db);

module.exports = db;