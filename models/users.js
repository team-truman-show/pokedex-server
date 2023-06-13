const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            userid: {
                type:Sequelize.STRING(50),
                unique: true,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            nickname: {
                type:Sequelize.STRING(30),
                allowNull: false,
            },
            salt: {
                type:Sequelize.STRING(200)
            }
        }, {
            sequelize,
            underscored:true,
            timestamps: false
        });
    }
    static associate(db) {
        db.User.hasMany(db.Mypoketmon, {foreignKey: {name: 'userid', onDelete:'SET NULL', as:'Mypoketmons'}});
    }

};
