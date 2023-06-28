const Sequelize = require('sequelize');

module.exports = class Mypokemon extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // 씻기기
        clean: {
          type: Sequelize.INTEGER,
          defaultValue: 50,
        },
        // 먹이기
        full: {
          type: Sequelize.INTEGER,
          defaultValue: 50,
        },
        // 산책하기
        intimate: {
          type: Sequelize.INTEGER,
          defaultValue: 50,
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
    db.Mypokemon.belongsTo(db.User, {
      foreignKey: { name: 'userid', onDelete: 'SET NULL', as: 'User' },
    });
  }
  static associate(db) {
    db.Mypokemon.belongsTo(db.Pokemon, {
      foreignKey: {
        name: 'pokeid',
        onDelete: 'SET NULL',
        as: 'Pokemon',
      },
    });
  }
};
