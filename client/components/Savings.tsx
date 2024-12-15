export const calculateAnnualExpenses = (expenses) => {
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

export const calculateSavings = (income, expenses) => {
  const annualExpenses = calculateAnnualExpenses(expenses)
  return income - annualExpenses
}
