const express = require("express");
const models = require("./models/index");
const signup = require("./service/signup");
const app = express();

app.use(express.json());

app.use("/", signup);
models.sequelize
  .authenticate()
  .then(() => {
    models.sequelize
      .sync()
      .then(() => {
        console.log("Sequelize sync success");
      })
      .catch((err) => {
        console.error("Sequelize sync failed", err);
      });
  })
  .catch((err) => {
    console.error("DB connection fail", err);
  });

app.listen(3000, () => {
  console.log("3000번 포트에서 대기중");
});
