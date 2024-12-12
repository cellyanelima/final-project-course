import express from 'express'
import connection from '../db/connection'

const router = express.Router()

router.get('/incomes-expenses', async (req, res) => {
  try {
    const transactions = await connection('transactions')
      .join('users', 'transactions.user_id', 'users.id')
      .select(
        'users.name as name',
        connection.raw(
          "SUM(CASE WHEN transactions.type = 'income' THEN transactions.amount ELSE 0 END) as totalIncome",
        ),
        connection.raw(
          "SUM(CASE WHEN transactions.type = 'expense' THEN transactions.amount ELSE 0 END) as totalExpense",
        ),
      )
      .groupBy('users.name')

    res.json(transactions)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Unknown error occurred' })
    }
  }
})

export default router
