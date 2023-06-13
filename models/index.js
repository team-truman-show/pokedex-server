const { sequelize } = require("./connection");

const db = {};

db.sequelize = sequelize;

exports.sequelize = db.sequelize;
