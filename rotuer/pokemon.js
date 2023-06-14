const express = require('express');
const router = express.Router();
const pokeapi = require('../service/pokeapi')
//api 불러오기,id 검색
router.post('/api',(req,res) =>{
    pokeapi(req.body.id)
  .then(result => {
    res.status(200).send(result);
  })
  .catch(error => {
    res.status(401).send(err);
  });
});

//이름 검색

module.exports = router;