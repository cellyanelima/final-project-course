import express from 'express'
import { TransactionData } from '../../models/transaction.ts'
import * as db from '../db/index.ts'

const router = express.Router()

router.post('/income', async (req, res) => {
  try {
    const income: TransactionData = req.body
    console.log('Received income data:', income)

    const user_id = 1

    if (!income.description || !income.amount || !income.frequency) {
      return res.status(400).json({ error: 'Missing required income fields' })
    }

    const newIncome = { ...income, user_id, type: 'income' }
    const incomeId = await db.addIncome(newIncome)
    res.status(201).json({ id: incomeId })
  } catch (err) {
    console.error('Error adding income:', err)
    res.status(500).json({ error: 'Failed to add income' })
  }
})

export default router
