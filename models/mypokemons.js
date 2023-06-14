const Sequelize = require('sequelize');

module.exports = class Mypokemon extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            id: {
                type:Sequelize.INTEGER,
                primaryKey: true
            },
            imageurl : {
                type:Sequelize.STRING(100),
                allowNull: true
        },
    },{
            sequelize,
            underscored: true,
            timestamps: false
        })
    }
    static associate(db) {
        db.Mypokemon.belongsTo(db.User,{foreignKey: {name:'userid',onDelete:'SET NULL',as:'User'}})
    };
    static associate(db) {
        db.Mypokemon.belongsTo(db.Pokemon,{foreignKey:{
            name:'pokeid',onDelete:'SET NULL',as: 'Pokemon'
        }})
    }
}