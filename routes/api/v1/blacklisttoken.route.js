import {Router} from "express"
const router = Router()
import BlackListToken from "#models/BlackListToken.js.js"

router.get('/list', async (req, res) => {
    try {

      let blacklisttoken = await BlackListToken.find()
      res.status(200).json({blacklisttoken})

    } catch (e) {
      res.status(500).json({message:e.message})
    }
  })

export default router