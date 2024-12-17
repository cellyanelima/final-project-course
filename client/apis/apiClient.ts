import request from 'superagent'
import { UserWithDetails } from '../../models/user'
import { TransactionData } from '../../models/transaction'

const rootUrl = '/api/v1'

export async function getUserWithDetails(): Promise<UserWithDetails> {
  const res = await request.get(`${rootUrl}/users/`)
  return res.body
}

export async function addNewExpense(newExpense: TransactionData) {
  await request.post(`${rootUrl}/expenses/`).send(newExpense)
}

export async function deleteExpense(id: number) {
  await request.del(`${rootUrl}/expenses/${id}`).then((res) => res)
}

export async function addNewIncome(newIncome: TransactionData) {
  await request.post(`${rootUrl}/incomes`).send(newIncome)
}

export async function deleteIncome(id: number) {
  await request.del(`${rootUrl}/incomes/${id}`).then((res) => res)
}

export async function updateExpense(
  id: number,
  updatedExpense: TransactionData,
): Promise<UserWithDetails> {
  const response = await request
    .patch(`${rootUrl}/expenses/${id}`)
    .send(updatedExpense)
  return response.body as UserWithDetails
}
