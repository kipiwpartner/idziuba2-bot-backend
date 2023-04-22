const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    const ver = jwt.verify(token, process.env.JWTSECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Problem with token..." });
      }
      console.log(user);
      req.user = user;
      next();
    });
  } catch (e) {
    res.status(401).json({ message: "No authorization..." });
  }
};
