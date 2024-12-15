import connection from './connection.ts'
import { Transaction, TransactionData } from '../../models/transaction.ts'
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

export async function addExpense(
  expense: TransactionData,
  db = connection,
): Promise<Transaction> {
  const [newTransaction] = await db('transactions')
    .insert({
      ...expense,
      type: 'expense',
    })
    .returning(['id', 'user_id', 'description', 'amount', 'frequency', 'type'])

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
