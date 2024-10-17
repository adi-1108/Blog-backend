const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;
  console.log(authHeader)

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  console.log(token);

  if (!token) {
    res.status(401);
    return res.json({ message: "User is not authorized or token expired" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401);
      return res.json({ message: "User is not authorized" });
    }
    console.log(decoded);
    req.user = decoded.user;
    next();
  });
});

module.exports = validateToken;
