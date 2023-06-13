const Sequelize = require('sequelize');

module.exports = class Mypoketmon extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            id: {
                type:Sequelize.INTEGER,
                primaryKey: true
            }
        }, {
            sequelize,
            underscored: true,
            timestamps: false
        })
    }
    static associate(db) {
        db.Mypoketmon.belongsTo(db.User,{foreignKey: {name:'userid',onDelete:'SET NULL',as:'User'}})
    };
    static associate(db) {
        db.Mypoketmon.belongsTo(db.Poketmon,{foreignKey:{
            name:'pokeid',onDelete:'SET NULL',as: 'Poketmon'
        }})
    }
}