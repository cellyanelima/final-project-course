import connection from './connection.ts'
import { Transaction, TransactionData } from '../../models/transaction.ts'
import { Goal } from '../../models/goal.ts'
import { UserWithDetails } from '../../models/user.ts'

// USER
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

// TRANSACTIONS
export async function addTransaction(
  transaction: TransactionData,
  db = connection,
): Promise<number> {
  const [newTransaction] = await db('transactions')
    .insert(transaction)
    .returning('id')

  return newTransaction
}

export async function deleteTransaction(
  id: number,
  db = connection,
): Promise<number> {
  const deletedCount = await db('transactions').where('id', id).del()
  if (deletedCount === 0) {
    throw new Error(`Transaction with ID ${id} not found`)
  }
  return id
}

export async function updateTransaction(
  id: number,
  updatedTransaction: Partial<Transaction>,
  db = connection,
): Promise<number> {
  const [updatedId] = await db('transactions')
    .where({ id })
    .update({
      description: updatedTransaction.description,
      amount: updatedTransaction.amount,
      type: updatedTransaction.type,
      user_id: updatedTransaction.user_id,
    })
    .returning('id')

  return updatedId
}
