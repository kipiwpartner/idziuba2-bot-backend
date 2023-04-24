import {Router} from "express"
const router = Router()
import Role from "../models/Role.js"
import auth_role from "../middleware/auth_role.js"

router.get('/list', async (req, res) => {
    try {

      let role = await Role.find()
      res.status(200).json({role})

    } catch (e) {
      res.status(500).json({message:e.message})
    }
  })

router.post('/create', async (req, res) => {
    try {

      let role_query = {role: req.body.role}
      role = await Role.findOne(role_query)
      if (role){
        return res.status(500).json({ message: `Role ${req.body.role} exists`, succes: false });
      }
      role = await Role.create(role_query)
      res.status(201).json({role, succes: true})

    } catch (e) {
      res.status(500).json({message:e.message, succes: false})
    }
  })

export default router