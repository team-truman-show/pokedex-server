
const express = require('express');
const models = require('./models/index');
const loginRouter = require('./service/login')
const bodyParser = require('body-parser');


const app = express();
// body-parser 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

models.sequelize.authenticate().then(() => {
    models.sequelize.sync().then(()=> {
        console.log('Sequelize sync success');
    }).catch((err) => {
        console.error('Sequelize sync failed',err);
    })
}).catch((err) => {
    console.error('DB connection fail',err);
})

app.use('/',loginRouter);

app.listen(3000,() => {
    console.log('3000번 포트 대기중');
});
