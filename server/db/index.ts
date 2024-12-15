import connection from './connection.ts'
import { Transaction } from '../../models/transaction.ts'
import { Goal } from '../../models/goal.ts'
import { UserWithDetails } from '../../models/user.ts'

export async function getUserWithDetailsById(
  id: number,
  db = connection,
): Promise<UserWithDetails | undefined> {
  const userData = await db('users').select().where('id', id).first()

  // Return undefined when no users were found
  if (!userData) return undefined

  const transactionsData = await db('transactions')
    .select()
    .where('user_id', id)
  const goalsData = await db('goals').select().where('user_id', id)

  // Combining user data with transactions and goals
  const userDataWithDetails = {
    ...userData,
    transactions: transactionsData,
    goals: goalsData,
  }

  return userDataWithDetails as UserWithDetails
}

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
        id: row.userId,
        name: row.userName,
        income: row.userIncome,
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
): Promise<Transaction> {
  const [newTransaction] = await db('transactions')
    .insert({
      user_id: expense.user_id,
      description: expense.description,
      amount: expense.amount,
      type: 'expense',
    })
    .returning(['id', 'user_id', 'description', 'amount', 'type'])

  return newTransaction as Transaction
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
