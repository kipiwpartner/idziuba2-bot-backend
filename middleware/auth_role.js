const dotenv = require("dotenv")
const BlackListToken = require("../models/BlackListToken")
dotenv.config({ path: "./config.env" })
const jwt = require("jsonwebtoken")

module.exports = function auth_role(roles = []) {

    if (typeof roles === 'string') {
        roles = [roles];
    }

  return (req, res, next) => {

    if (req.method === "OPTIONS") {
      return next()
    }
    try {
      const token = req.headers.authorization.split(" ")[1]

      jwt.verify(token, process.env.JWTSECRET, async (err, user) => {
        console.log(user)
        if (err) {
          return res.status(401).json({ message: "Problem with token...", succes: false })
        }

        is_bloked = await BlackListToken.findOne({token})
        if (is_bloked) {
          return res.status(500).json({ message: "Token is blocked. Relogin please...", succes: false })
        }

        let intersection = roles.filter(x => user.userRole.includes(x))
        if (intersection.length === 0){
            return res.status(401).json({ message: "Access is denied for your role...", succes: false})
        }
        //req.user = user
        return next()
      });
    } catch (e) {
      return res.status(401).json({ message: "No authorization...", succes: false })
    }
  }
}
