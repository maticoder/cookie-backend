const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  } else {
    token = req.headers.authorization.split("Bearer ")[1];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid token",
        });
      } else {
        req.user = decoded;
        return next();
      }
    });
  }
};
