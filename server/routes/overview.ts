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

  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' })
  }

  try {
    // Fetch transactions for the user
    const transactions = await db('transactions')
      .where({ user_id })
      .select('id', 'description', 'amount', 'type')

    // Fetch goals for the user
    const goals = await db('goals')
      .where({ user_id })
      .select('id', 'title', 'target_amount')

    if (transactions.length === 0 && goals.length === 0) {
      return res
        .status(404)
        .json({ message: `No data found for user ${user_id}` })
    }

    res.json({ user_id, transactions, goals })
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

export default router
