import connection from './connection.ts'
import { UserWithDetails, Transaction, Goal } from '../../models/user.ts'

export async function getAllGoals(db = connection): Promise<UserWithDetails[]> {
  const rawData = await db('goals')
    .join('users', 'goals.user_id', 'users.id')
    .leftJoin('transactions', 'users.id', 'transactions.user_id')
    .select(
      'users.id as userId',
      'users.name as userName',
      'users.income as userIncome',
      'goals.id as goalId',
      'goals.title',
      'goals.target_amount as targetAmount',
      'goals.current_amount as currentAmount',
      'transactions.id as transactionId',
      'transactions.description',
      'transactions.amount',
      'transactions.type',
    )

  // Transform raw data into the expected structure
  const userMap: Record<number, UserWithDetails> = {}

  rawData.forEach((row) => {
    // Add user to the map if not already added
    if (!userMap[row.userId]) {
      userMap[row.userId] = {
        userId: row.userId,
        userName: row.userName,
        userIncome: row.userIncome,
        transactions: [],
        goals: [],
      }
    }

    // Add transaction if it exists
    if (row.transactionId) {
      userMap[row.userId].transactions.push({
        id: row.transactionId,
        user_id: row.userId,
        description: row.description,
        amount: row.amount,
        type: row.type as 'income' | 'expense',
      } as Transaction)
    }

    // Add goal if not already added
    if (!userMap[row.userId].goals.some((goal) => goal.id === row.goalId)) {
      userMap[row.userId].goals.push({
        id: row.goalId,
        user_id: row.userId,
        title: row.title,
        target_amount: row.targetAmount,
        current_amount: row.currentAmount,
      } as Goal)
    }
  })

  // Convert the map to an array
  return Object.values(userMap)
}

export async function addExpense(
  expense: Transaction,
  db = connection,
): Promise<number> {
  const [newTransaction] = await db('transactions')
    .insert({
      user_id: expense.user_id,
      description: expense.description,
      amount: expense.amount,
      type: 'expense',
    })
    .returning('id')

  return newTransaction
}

export async function deleteExpense(
  expenseId: number,
  db = connection,
): Promise<number> {
  const deletedCount = await db('transactions').where({ id: expenseId }).del()

  if (deletedCount === 0) {
    throw new Error(`Expense with ID ${expenseId} not found`)
  }

  return expenseId
}
