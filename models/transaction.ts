export interface TransactionForm {
  description: string
  amount: number
  frequency:
    | 'One-Off'
    | 'Daily'
    | 'Weekly'
    | 'Fortnightly'
    | 'Monthly'
    | 'Annually'
  type: 'income' | 'expense'
}

export interface TransactionData extends TransactionForm {
  user_id: number
}

export interface Transaction extends TransactionForm {
  id: number
  user_id: number
}
