const express = require('express');
const router = express.Router();
const login = require('../service/login');
const signup = require('../service/signup');
//로그인
router.post('/login',(req,res)=> {
    const userid = req.body.userid;
    const password = req.body.password;
    login(userid,password).then((result) => {
        res.set("token", result);
        res.status(200).send(result);
    }).catch(err => {
        res.status(401).send(err);
    })
})
//회원가입
router.post('/signup',(req,res) =>{
    signup(req.body).then((result) => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(401).send(err);
    })
})
module.exports = router;