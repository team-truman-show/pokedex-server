
const express = require('express');
const models = require('./models/index');

const app = express();

models.sequelize.authenticate().then(() => {
    models.sequelize.sync().then(()=> {
        console.log('Sequelize sync success');
    }).catch((err) => {
        console.error('Sequelize sync failed',err);
    })
}).catch((err) => {
    console.error('DB connection fail',err);
})

