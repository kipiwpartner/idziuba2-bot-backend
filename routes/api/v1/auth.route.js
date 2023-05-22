import { Router } from "express"
import bcrypt from "bcryptjs"
const router = Router();
import Role from "#models/Role.js"
import User from "#models/User.js"
import BlackListToken from "#models/BlackListToken.js"
import dotenv from "dotenv"
dotenv.config({ path: "./config.env" });
import jwt from "jsonwebtoken"

router.post("/register", async (req, res) => {
  try {
    const role = await Role.findOne({ role: "user" })
    const email = req.body.email
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    let user = await User.findOne({email})
    if (user){
      return res.status(500).json({ message: `Email ${email} exists`, succes: false });
    }
    user = await User.create({
      email,
      password: hashPassword,
      role,
    })
    res.status(201).json({ user, succes: true });
  } catch (e) {
    res.status(500).json({ message: e.message, succes: false });
  }
})
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("role")

    if (!user) {
      return res.status(500).json({ message: "User is not found", result: false });
    } else {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(500).json({ message: "Password not match", result: false });
      }
    }

    const token = jwt.sign(
      {
        userId: user.id,
        userRoleName: user.role.name,
        userRoleId: user.role.id
      },
      process.env.JWTSECRET,
      { expiresIn: "1d" }
    )

    const csrfToken = await bcrypt.hash(process.env.CSRF_TOKEN, 5)

    req.session.user  = {
      roleName: user.role.name,
      roleId: user.role.id,
      email: user.email,
      userAgent: req.headers['user-agent'],
      csrfToken
    }

    req.session.save(err => {
      if (err){
        throw err
      }
    })
    res.status(200).json({ token, csrfToken, userId: user.id, userRole: user.role.name, result: true });
  } catch (e) {
    res.status(500).json({ message: e.message, result: false });
  }
});

router.get("/logout", async (req, res) => {
  try {

    await BlackListToken.create({ token: req.session.user.token })
    req.session.destroy(async () => {
      res.status(200).json({ succes: true });
    })

  } catch (e) {
    res.status(500).json({message:e.message})
  }
});

export default router
