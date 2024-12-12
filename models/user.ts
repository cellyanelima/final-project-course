export interface User {
  id: number
  name: string
  income: number
}

export interface Transaction {
  id: number
  user_id: number
  description: string
  amount: number
  type: 'income' | 'expense'
}

export interface Goal {
  id: number
  user_id: number
  title: string
  target_amount: number
  current_amount: number
}

export interface UserWithDetails {
  userId: number
  userName: string
  userIncome: number
  transactions: Transaction[]
  goals: Goal[]
}

export interface IncomeExpenseData {
  name: string
  totalIncome: number
  totalExpense: number
}
