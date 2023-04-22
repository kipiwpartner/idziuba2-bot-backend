const { Router } = require("express");
const mongoose = require("mongoose");
const Role = require("../models/Role");
const User = require("../models/User");
const BlackListToken = require("../models/BlackListToken");
const auth_role = require("../middleware/auth_role");
const jwt = require("jsonwebtoken");
const router = Router();

router.get("/list", auth_role(['admin', 'manager']), async (req, res) => {
  try {
    let users = await User.find().populate("role")
    res.status(200).json({ users })
  } catch (e) {
    res.status(500).json({ message: e.message, succes: false })
  }
})

router.put("/superadmin/edit/:id", auth_role('admin'), async (req, res) => {
  try {
    
    let userid = req.params.id

    //let role = req.body.role
    // const new_role = []
    // for (i = 0; i < role.length; i++) {
    //   if (mongoose.isValidObjectId(role[i].id)) {
    //     role = await Role.findById(role[i].id);
    //     if (role) {
    //       new_role.push(role);
    //     }
    //   }
    // }

    const new_role = Promise.all(
      req.body.role.map(async (role) => {
        if (mongoose.isValidObjectId(role.id)) {
          role = await Role.findById(role.id)
          if (role) {
            return role._id
          }
        }
      })
    )
    const roleRes =  await new_role

    if (roleRes.length > 0) {
      id = new mongoose.Types.ObjectId(userid)
      user = await User.findByIdAndUpdate(id, { role: roleRes })
      if (!!user.token) {
        await BlackListToken.create({ token: user.token })
      } else {
        return res.status(500).json({ message:"User has no token...", succes: false })
      }

    } else 
        return res.status(500).json({ succes: false })

    res.status(200).json({ succes: true })
  } catch (e) {
    res.status(500).json({ message: e.message, succes: false })
  }
})

router.put("/edit/:id", auth_role('admin'), async (req, res) => {
  try {
    let userid = req.params.id
    arr_role = req.body.role
    if (mongoose.isValidObjectId(userid)){
      role = await Role.find().select('+name');
      const role_changed = role.filter(role => arr_role.includes(role.role))
      user = await User.findOneAndUpdate({ _id:  userid}, {email: req.body.email, role: role_changed}, {new: true}).populate('role')
      if (user){
        if (!!user.token) {
          black_lest_token = await BlackListToken.findOne({ token: user.token })
          if (black_lest_token === null) await BlackListToken.create({ token: user.token })
        }
        res.status(200).json({ user, succes: true })
      } else {
        return res.status(500).json({ message:"User is not found...", succes: false })
      }
    } else {
      return res.status(500).json({ message:"Bad user ID...", succes: false })
    }
  } catch (e) {
    res.status(500).json({ message: e.message, succes: false })
  }
})

module.exports = router
