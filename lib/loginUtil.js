const tokenUtil = require("./tokenUtil");

const loginUtil = {
  isLoggedIn(req, res, next) {
    // const token =req.headers.token && req.headers;
    const token = req.cookies.token;
    if (token) {
      const decoded = tokenUtil.verifyToken(token);

      if (decoded) {
        const newToken = tokenUtil.makeToken(decoded);
        res.set("token", newToken);

        next();
      } else {
        const err = new Error("로그인 검증 실패");

        res.status(401).json({ err: err.toString() });
      }
    } else {
      const err = new Error("로그인이 필요합니다");
      res.status(401).json({ err: err.toString() });
    }
  },
};

module.exports = loginUtil;
