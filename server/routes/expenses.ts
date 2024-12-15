import express from 'express'
import * as db from '../db/index.ts'
import { TransactionData } from '../../models/transaction.ts'

const router = express.Router()

router.post('/', async (req, res) => {
  const { transaction } = req.body as { transaction: TransactionData }
  // TODO: Needs implementation
  const user_id = 1

  if (!transaction) {
    console.error('No expense')
    return res.status(400).send('Bad request')
  }

  const expense = {
    ...transaction,
    user_id: user_id,
    description: transaction.description,
    amount: transaction.amount,
  }

  try {
    const newTransaction = await db.addExpense(expense)

    res.status(201).json({ expense: newTransaction })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

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
