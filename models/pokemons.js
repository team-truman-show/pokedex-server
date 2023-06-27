const Sequelize = require("sequelize");

module.exports = class Pokemon extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(30),
          unique: true,
          allowNull: false,
        },
        feature: {
          type: Sequelize.STRING(50),
        },
        description: {
          type: Sequelize.STRING(500),
        },
        type1: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        type2: {
          type: Sequelize.STRING(20),
        },
        imageurl: {
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        imagegif: {
          type: Sequelize.STRING(300),
        },
        capture_rate: {
          type: Sequelize.INTEGER,
        },
        evolution_url: {
          type: Sequelize.INTEGER,
        },
        nextevolves: {
          type: Sequelize.INTEGER,
        },
        possibility: {
          type: Sequelize.BOOLEAN,
        },
      },
      {
        sequelize,
        underscored: true,
        timestamps: false,
      }
    );
  }
  static associate(db) {
    db.Pokemon.hasMany(db.Mypokemon, {
      foreignKey: { name: "pokeid", onDelete: "SET NULL", as: "Mypokemons" },
    });
  }
  static associate(db) {
    db.Pokemon.hasMany(db.Evolve, {
      foreignKey: { name: "pokeid", onDelete: "SET NULL", as: "Evolves" },
    });
  }
};
