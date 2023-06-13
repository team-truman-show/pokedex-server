const express = require("express");
const models = require("./models/index");
const sginup = require("./service/signup");

const app = express();

app.use("", sginup);

models.sequelize
  .authenticate()
  .then(() => {
    // sequelize sync (table 생성)
    models.sequelize
      .sync()
      .then(() => {
        console.log("성공");
      })
      .catch((err) => {
        console.log("실패");
      });
  })
  .catch((err) => {
    console.log("실패");
  });

app.listen(3000, () => {
  console.log("3000번 포트 열림");
});
