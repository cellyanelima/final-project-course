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

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const updatedFields: Partial<TransactionData> = req.body

    if (!id || !Object.keys(updatedFields).length) {
      return res
        .status(400)
        .json({ error: 'Invalid ID or no fields to update' })
    }

    const updatedId = await db.updateExpense(id, updatedFields)

    if (updatedId) {
      res.status(200).json({ id: updatedId })
    } else {
      res.status(404).json({ error: 'Expense not found' })
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(500).json({ error: 'An unknown error occurred' })
    }
  }
})

export default router
