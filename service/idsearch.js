const {User} = require('../models/index');
async function Idfind(email){
    const user = await User.findOne({
        where:{email:email}
    })
    if(!user)
        return new Error("일치하는 유저가 없습니다.")
    return user.id;
}

module.exports = Idfind; 