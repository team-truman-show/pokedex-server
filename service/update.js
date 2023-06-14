const express = require("express");
const User = require("../models/users");
const router = express.Router();

router.patch("/update", async (req, res) => {
  // 비동기 함수로 변경
  const userid = req.body.userid;
  const newNickname = req.body.nickname; // 새로운 닉네임을 받아옴
  console.log(newNickname); //
  try {
    const exUser = await User.findOne({ where: { id: userid } }); // await 키워드 추가하여 비동기 처리

    if (!exUser) {
      return res.status(400).send("일치하지 않는 id입니다");
    }
    if (!newNickname) {
      return res.status(400).send("닉네임을 적어주세요");
    }

    exUser.nickname = newNickname; // 닉네임을 새로운 닉네임으로 변경
    await exUser.save(); // 변경사항 저장

    res.status(200).json({ message: "닉네임 변경 성공" });
  } catch (err) {
    console.error("err", err);
    res.status(500).send("서버 오류");
  }
});

module.exports = router;
