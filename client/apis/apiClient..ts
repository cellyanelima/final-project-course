import request from 'superagent'
import { IncomeExpenseData } from '../../models/user'

const rootUrl = '/api/v1'

export async function fetchIncomeExpenseData(): Promise<IncomeExpenseData[]> {
  const res = await request.get(`${rootUrl}/finances/incomes-expenses`)
  //console.log('Data sought:', res.body)
  //console.log('Data received from backend:', res.body)
  return res.body
}
