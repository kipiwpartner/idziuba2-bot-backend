import dotenv from "dotenv"
import BlackListToken from "../models/BlackListToken.js"
dotenv.config({ path: "./config.env" })
import jwt from "jsonwebtoken"

const authRoleQraphql = function (roles = []) {

    if (typeof roles === 'string') {
        roles = [roles];
    }

  return (req, res, next) => {

    console.log(req.headers)
    if (req.method === "OPTIONS") {
      return next()
    }
    try {
      return next()
    } catch (e) {
      return res.status(401).json({ message: "No authorization...", succes: false })
    }
  }
}

export default authRoleQraphql
