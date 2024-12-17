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
): Promise<number> {
  const [newTransaction] = await db('transactions')
    .insert({
      ...expense,
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

export async function updateExpense(
  id: number,
  updatedExpense: Partial<Transaction>,
  db = connection,
): Promise<number> {
  const [updatedId] = await db('transactions')
    .where({ id })
    .update({
      description: updatedExpense.description,
      amount: updatedExpense.amount,
      type: updatedExpense.type,
      user_id: updatedExpense.user_id,
    })
    .returning('id')

  return updatedId
}

export async function addIncome(
  income: TransactionData,
  db = connection,
): Promise<number> {
  const result = await db('transactions').insert({
    user_id: income.user_id,
    description: income.description,
    amount: income.amount,
    frequency: income.frequency,
    type: 'income',
  })
  const id = result[0]
  return id
}
