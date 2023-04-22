const {Router} = require('express')
const router = Router()
const BlackListToken = require('../models/BlackListToken')
const auth = require('../middleware/auth')
const auth_role = require('../middleware/auth_role')

router.get('/list', async (req, res) => {
    try {

      let blacklisttoken = await BlackListToken.find()
      res.status(200).json({blacklisttoken})

    } catch (e) {
      res.status(500).json({message:e.message})
    }
  })

  module.exports = router;