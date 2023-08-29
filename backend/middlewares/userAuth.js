const jwt = require("jsonwebtoken");

async function userAuth(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "buyc", function (err, decoded) {
      if (err) {
        res.send({ msg: "Invalid token" });
        return;
      }

      req.body.dealerId = decoded.dealerId;

      next();
    });
  } else {
    res
      .status(401)
      .send({ status: false, msg: "You are not authorized, Please login" });
  }
}

module.exports = { userAuth };
