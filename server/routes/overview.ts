import express from 'express'
import knex from 'knex'
import * as Path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: Path.resolve(__dirname, '../db/dev.sqlite3'),
  },
  useNullAsDefault: true,
})

const router = express.Router()

router.get('/', async (req, res) => {
  const { user_id } = req.query

  // Validate user_id
  if (!user_id || isNaN(Number(user_id))) {
    return res.status(400).json({ error: 'Invalid or missing user_id' })
  }

  try {
    // Fetch transactions for the user
    const transactions = await db('transactions')
      .where({ user_id })
      .select('id', 'description', 'amount', 'type', 'frequency')

    // Fetch goals for the user
    const goals = await db('goals')
      .where({ user_id })
      .select('id', 'title', 'target_amount')

    if (transactions.length === 0 && goals.length === 0) {
      return res
        .status(404)
        .json({ error: `No transactions or goals found for user ${user_id}` })
    }

    // Respond with data
    res.json({
      user_id,
      transactions_count: transactions.length,
      goals_count: goals.length,
      transactions,
      goals,
    })
  } catch (error) {
    console.error(
      `[Overview API] Error fetching data for user ${user_id}:`,
      error,
    )
    res.status(500).json({ error: 'An internal server error occurred' })
  }
})

export default router
