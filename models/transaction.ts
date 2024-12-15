export interface TransactionData {
  user_id: number
  description: string
  amount: number
  frequency:
    | 'One-Off Expense'
    | 'Daily'
    | 'Weekly'
    | 'Fortnightly'
    | 'Monthly'
    | 'Annually'
  type: 'income' | 'expense'
}

export interface Transaction extends TransactionData {
  id: number
}
