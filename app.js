const express = require("express");
const models = require("./models/index");
const userRouter = require("./rotuer/user");
const bodyParser = require("body-parser");
const pokemonRouter = require("./rotuer/pokemon");
const cors = require("cors");
const app = express();

// body-parser 미들웨어 설정
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
const corsOptions = {
    origin: ["http://localhost:5173","http://127.0.0.1:5173","http://192.168.0.112:4000","http://localhost:4000"],
    credentials: true
  }
app.use(cors(corsOptions));
app.use("/user", userRouter);
app.use("/pokemon", pokemonRouter.router);
// pokemonRouter.save();
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
  console.log("3000번 포트 대기중");
});
