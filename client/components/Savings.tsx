import { useUserData } from '../hooks/useUserData'
import { Transaction, TransactionForm } from '../../models/transaction'

const calculateAnnualSum = (transactions: TransactionForm[]) => {
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

interface Props {
  transactions: TransactionForm[]
}

const Savings: React.FC<Props> = ({ transactions }) => {
  const { data, isLoading, error } = useUserData()

  if (isLoading) {
    return <p>Loading data...</p>
  }

  if (error instanceof Error) {
    return <p>Error loading data: {error.message}</p>
  }

  if (!data) {
    return <p>Error: data not found.</p>
  }

  const incomeTransactions = transactions.filter((t) => t.type == 'income')
  const expenseTransactions = transactions.filter((t) => t.type == 'expense')
  data.transactions.forEach((t: TransactionForm) => {
    if (t.type == 'income') incomeTransactions.push(t)
    if (t.type == 'expense') expenseTransactions.push(t)
  })

  const incomeTotal = calculateAnnualSum(incomeTransactions)
  const expenseTotal = calculateAnnualSum(expenseTransactions)
  const annualSavings = incomeTotal - expenseTotal

  return (
    <section>
      <h2>Annual Savings</h2>
      <div>
        <h1>${annualSavings.toLocaleString()}</h1>
      </div>
    </section>
  )
}

export default Savings
