
module.exports = class Pokemon extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            id: {
                type:Sequelize.INTEGER,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(30),
                unique: true,
                allowNull: false,
            },
            feature: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            type1: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            type2: {
                type: Sequelize.STRING(20)
            },
            imageurl: {
                type: Sequelize.STRING(300),
                allowNull: false
            },
            imagegif: {
                type: Sequelize.STRING(300),
            }
        }, {
            sequelize,
            underscored:true,
            timestamps: false
        })
    }
    static associate(db) {
        db.Pokemon.hasMany(db.Mypokemon,{foreignKey: {name: 'pokeid',onDelete:'SET NULL',as:'Mypokemons'}})
    }
}