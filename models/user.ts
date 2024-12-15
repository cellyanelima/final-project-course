import { Transaction } from './transaction'
import { Goal } from './goal'

export interface User {
  id: number
  name: string
  income: number
}

export interface UserWithDetails extends User {
  transactions: Transaction[]
  goals: Goal[]
}
