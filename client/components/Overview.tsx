import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

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
    <div className="overview">
      <h1>Finance Overview for User {userId}</h1>

      {loading && <p>Loading data...</p>}

      {error && <p>Error: {error}</p>}

      {transactions.length > 0 || goals.length > 0 ? (
        <div>
          {/* Transactions Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Left: Income Table */}
            <div style={{ width: '45%' }}>
              <h2>Income Transactions</h2>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.description}</td>
                      <td>${transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right: Expense Table */}
            <div style={{ width: '45%' }}>
              <h2>Expense Transactions</h2>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.description}</td>
                      <td>${transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Goals Section */}
          <div>
            <h2>Goals</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Target Amount</th>
                </tr>
              </thead>
              <tbody>
                {goals.map((goal) => (
                  <tr key={goal.id}>
                    <td>{goal.id}</td>
                    <td>{goal.title}</td>
                    <td>${goal.target_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No transactions or goals found.</p>
      )}
    </div>
  )
}

export default Overview
