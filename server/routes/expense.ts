import { addExpense, deleteExpense } from '../db'
import express from 'express'
import { Transaction } from '../../models/user'
import connection from '../db/connection'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const expense: Transaction = req.body
    if (
      !expense.user_id ||
      !expense.description ||
      !expense.amount ||
      !expense.type
    ) {
      return res.status(400).json({ error: 'Missing required expense fields' })
    }

    const expenseId = await addExpense(expense)
    res.status(201).json({ id: expenseId })
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(500).json({ error: 'An unknown error occurred' })
    }
  }
})

router.get('/', async (req, res) => {
  try {
    const expenses = await connection('transactions').select('*')
    res.json(expenses)
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(500).json({ error: 'An unknown error occurred' })
    }
  }
})

export default router
