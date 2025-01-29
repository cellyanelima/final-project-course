import { useEffect, useState } from 'react'
import { Transaction } from '../../models/transaction'

const calculateAnnualSum = (transactions: Transaction[]) => {
  return transactions.reduce((total, expense) => {
    switch (expense.frequency) {
      case 'Annually':
        return total + expense.amount
      case 'Monthly':
        return total + expense.amount * 12
      case 'Fortnightly':
        return total + expense.amount * 26
      case 'Weekly':
        return total + expense.amount * 52
      case 'Daily':
        return total + expense.amount * 365
      case 'One-Off':
        return total + expense.amount
      default:
        return total
    }
  }, 0)
}

export const useFinancialCalculations = (transactions: Transaction[]) => {
  const [annualSavings, setAnnualSavings] = useState(0)

  useEffect(() => {
    const incomeTransactions = transactions.filter((t) => t.type == 'income')
    const expenseTransactions = transactions.filter((t) => t.type == 'expense')

    const incomeTotal = calculateAnnualSum(incomeTransactions)
    const expenseTotal = calculateAnnualSum(expenseTransactions)

    setAnnualSavings(incomeTotal - expenseTotal)
  }, [])

  return { annualSavings }
}
