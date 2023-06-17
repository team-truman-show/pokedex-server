const {User} = require('../models/index');
async function informSearch(email){
    try{
        const user = await User.findOne({
            where:{email:email}
        })
        if(!user)
            throw new Error("일치하는 유저 정보가 없습니다.");
        return user;
    }catch(err){
        return err;
    }
}

module.exports = informSearch;