const express = require('express');
const router = express.Router();
const Login = require('../service/login');
const Signup = require('../service/signup');
//로그인
router.post('/login',(req,res)=> {
    const userid = req.body.userid;
    const password = req.body.password;
    Login(userid,password).then((result) => {
        res.set("token", result);
        res.status(200).send(result);
    }).catch(err => {
        res.status(401).send(err.message);
    })
});
//회원가입
router.post('/signup',(req,res) =>{
    Signup(req.body).then((result) => {
        if(result instanceof Error)
            throw result;
        res.status(200).send(result);
    }).catch(err => {
        res.status(401).send(err.message);
    })
});
module.exports = router;