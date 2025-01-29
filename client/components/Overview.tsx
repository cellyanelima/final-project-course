import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import '../styles/index.scss'

function Overview() {
  const [transactions, setTransactions] = useState<any[]>([]) // Store transactions data
  const [goals, setGoals] = useState<any[]>([]) // Store goals data
  const [loading, setLoading] = useState(true) // Track loading state
  const [error, setError] = useState<string | null>(null) // Track error state
  const [incomeTransactions, setIncomeTransactions] = useState<any[]>([]) // Store income transactions
  const [expenseTransactions, setExpenseTransactions] = useState<any[]>([]) // Store expense transactions
  const location = useLocation() // Access the URL query parameters

  // Extract user_id from query string
  const userId = new URLSearchParams(location.search).get('user_id')

  // Helper function to convert different frequencies to monthly equivalent
  const getMonthlyEquivalent = (amount: number, frequency: string) => {
    console.log(`Processing amount: ${amount}, Frequency: ${frequency}`) // Log each frequency

    // Ensure amount is a valid number
    if (isNaN(amount)) {
      console.error(`Invalid amount: ${amount}`)
      return 0 // Return 0 if the amount is not valid
    }

    switch (frequency) {
      case 'Weekly':
        const weeklyAmount = amount * 4.33 // 4.33 weeks in a month
        console.log(`Weekly income: ${weeklyAmount}`)
        return weeklyAmount
      case 'Fortnightly':
        const fortnightlyAmount = amount * 2 // 2 fortnights in a month
        console.log(`Fortnightly income: ${fortnightlyAmount}`)
        return fortnightlyAmount
      case 'Monthly':
        console.log(`Monthly income: ${amount}`)
        return amount // Already monthly
      case 'Daily':
        const dailyAmount = amount * 30 // Approx 30 days in a month
        console.log(`Daily income: ${dailyAmount}`)
        return dailyAmount
      case 'Annually':
        const annuallyAmount = amount / 12 // Divide by 12 to get monthly equivalent
        console.log(`Annually income: ${annuallyAmount}`)
        return annuallyAmount
      default:
        console.warn(`Unknown frequency: ${frequency}`)
        return 0 // Unknown frequency
    }
  }

  // Function to calculate the time to reach a goal
  const calculateTimeToGoal = (goalAmount: number) => {
    // Calculate total monthly income
    const totalIncome = incomeTransactions.reduce((acc, transaction) => {
      const monthlyIncome = getMonthlyEquivalent(
        transaction.amount,
        transaction.frequency,
      )
      console.log(
        `Income Transaction: ${transaction.id}, Monthly Income: ${monthlyIncome}`,
      ) // Log each monthly income
      return acc + monthlyIncome
    }, 0)

    // Calculate total monthly expenses
    const totalExpense = expenseTransactions.reduce((acc, transaction) => {
      const monthlyExpense = getMonthlyEquivalent(
        transaction.amount,
        transaction.frequency,
      )
      console.log(
        `Expense Transaction: ${transaction.id}, Monthly Expense: ${monthlyExpense}`,
      ) // Log each monthly expense
      return acc + monthlyExpense
    }, 0)

    // Net monthly savings
    const netMonthlySavings = totalIncome - totalExpense

    // Debugging the final values
    console.log('Total Monthly Income:', totalIncome)
    console.log('Total Monthly Expenses:', totalExpense)
    console.log('Net Monthly Savings:', netMonthlySavings)

    // If net monthly savings are zero or negative, display a message
    if (netMonthlySavings <= 0) {
      return "You don't have enough monthly savings to reach this goal."
    }

    // Calculate how many months it will take to reach the goal
    const monthsToReachGoal = goalAmount / netMonthlySavings

    // Return the time to reach the goal (rounded up to the nearest month)
    return `It will take approximately ${Math.ceil(monthsToReachGoal)} month(s) to reach this goal.`
  }

  useEffect(() => {
    if (!userId) {
      setError('User ID is required')
      setLoading(false)
      return
    }

    const fetchTransactionsAndGoals = async () => {
      try {
        // Fetch transactions and goals data from the backend for the specific user_id
        const response = await fetch(`/api/v1/overview?user_id=${userId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setTransactions(data.transactions) // Set the transactions data
        setGoals(data.goals) // Set the goals data

        // Separate transactions by type (income vs expense)
        const income = data.transactions.filter((t: any) => t.type === 'income')
        const expense = data.transactions.filter(
          (t: any) => t.type === 'expense',
        )
        setIncomeTransactions(income)
        setExpenseTransactions(expense)
      } catch (error: any) {
        setError(error.message) // Set the error message if the fetch fails
      } finally {
        setLoading(false) // Set loading to false once the fetch is done
      }
    }

    fetchTransactionsAndGoals()
  }, [userId])

  return (
    <div className="overview-page">
      {/* Title at the top of the page */}
      <div>
        <h1 className="title">My PiggyPal</h1>
      </div>

      <div className="user-finance-title">
        <h1>Finance Overview for User {userId}</h1>
      </div>

      {loading && <p>Loading data...</p>}

      {error && <p>Error: {error}</p>}

      {transactions.length > 0 || goals.length > 0 ? (
        <div className="tables-container">
          {/* Transactions Section */}
          <div className="transactions-section">
            {/* Left: Income Table */}
            <div className="income-box">
              <h3>Income Transactions</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.description}</td>
                      <td>${transaction.amount}</td>
                      <td>{transaction.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right: Expense Table */}
            <div className="expense-box">
              <h3>Expense Transactions</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.description}</td>
                      <td>${transaction.amount}</td>
                      <td>{transaction.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Goals Section */}
          <div className="goal-box">
            <h3>Goals</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Target Amount</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {goals.map((goal) => (
                  <tr key={goal.id}>
                    <td>{goal.id}</td>
                    <td>{goal.title}</td>
                    <td>${goal.target_amount}</td>
                    <td>
                      {/* Calculate the time to reach the goal */}
                      {calculateTimeToGoal(goal.target_amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No transactions or goals found.</p>
      )}
      {/* Link to Overview Page */}
      <div className="overview-link">
        <Link to="/">Return Home</Link>
      </div>
    </div>
  )
}

export default Overview
