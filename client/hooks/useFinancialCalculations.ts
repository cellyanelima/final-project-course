import { useState, useEffect } from 'react'

export const useFinancialCalculations = (income, expenses) => {
  const [annualExpenses, setAnnualExpenses] = useState(0)
  const [savings, setSavings] = useState(0)

  useEffect(() => {
    const calculateAnnualExpenses = (expenses) => {
      return expenses.reduce((total, expense) => {
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

    const newAnnualExpenses = calculateAnnualExpenses(expenses)
    setAnnualExpenses(newAnnualExpenses)
    setSavings(income - newAnnualExpenses)
  }, [income, expenses])

  return { annualExpenses, savings }
}
