import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    // TODO: Needs implementation
    const user_id = 1

    const user = await db.getUserWithDetailsById(user_id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
