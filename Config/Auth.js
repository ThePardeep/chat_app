const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, "chatapp", (err, decode) => {
    if (err) {
      res.status(200).json({
        error: true,
        msg: "Token Expire"
      });
      return;
    }
    next();
  });
};
