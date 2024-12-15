import express from 'express'
import { TransactionData } from '../../models/transaction.ts'
import * as db from '../db/index.ts'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const expense: TransactionData = req.body

    // TODO: Needs implementation
    const user_id = 1

    if (
      !expense.description ||
      !expense.amount ||
      !expense.frequency ||
      !expense.type
    ) {
      return res.status(400).json({ error: 'Missing required expense fields' })
    }

    const newExpense = {
      ...expense,
      user_id: user_id,
    }

    const expenseId = await db.addExpense(newExpense)
    res.status(201).json({ id: expenseId })
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(500).json({ error: 'An unknown error occurred' })
    }
  }
})

/*
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
*/

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)

  if (!id) {
    console.error('Invalid transaction id')
    return res.status(400).send('Bad request')
  }

  try {
    await db.deleteExpense(id)
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router
