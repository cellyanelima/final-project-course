import React, { useState } from 'react'
import { useFinancialCalculations } from '../hooks/useFinancialCalculations'

interface Expense {
  expense: string
  amount: number
  frequency: string
}

const FormField: React.FC = () => {
  const [income, setIncome] = useState<number>(0)
  const [expenses, setExpenses] = useState<Expense[]>([
    { expense: '', amount: 0, frequency: 'Monthly' },
  ])

  const { savings } = useFinancialCalculations(income, expenses)

  const addExpense = () => {
    setExpenses([...expenses, { expense: '', amount: 0, frequency: 'Monthly' }])
  }

  const deleteExpense = (index: number) => {
    setExpenses(expenses.filter((_, idx) => idx !== index))
  }

  return (
    <>
      <section className="income">
        <div>
          <label htmlFor="income">Income: </label>
          <input
            type="number"
            id="income"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
          />
        </div>
      </section>
      <section className="expenses">
        <h2>Expenses</h2>
        {expenses.map((expense, index) => (
          <div key={index} className="expense-row">
            <label htmlFor={`expense-${index}`}>Expense:</label>
            <input
              type="text"
              id={`expense-${index}`}
              value={expense.expense}
              onChange={(e) => {
                const newExpenses = [...expenses]
                newExpenses[index].expense = e.target.value
                setExpenses(newExpenses)
              }}
            />
            <label htmlFor={`amount-${index}`}>Amount:</label>
            <input
              type="number"
              id={`amount-${index}`}
              value={expense.amount}
              onChange={(e) => {
                const newExpenses = [...expenses]
                newExpenses[index].amount = Number(e.target.value)
                setExpenses(newExpenses)
              }}
            />
            <label htmlFor={`frequency-${index}`}>Frequency:</label>
            <select
              id={`frequency-${index}`}
              value={expense.frequency}
              onChange={(e) => {
                const newExpenses = [...expenses]
                newExpenses[index].frequency = e.target.value
                setExpenses(newExpenses)
              }}
            >
              <option value="Annually">Annually</option>
              <option value="Monthly">Monthly</option>
              <option value="Fortnightly">Fortnightly</option>
              <option value="Weekly">Weekly</option>
              <option value="Daily">Daily</option>
              <option value="One-Off">One-Off Expense</option>
            </select>
            <button onClick={() => deleteExpense(index)}>Delete</button>
          </div>
        ))}
        <br></br>
        <button onClick={addExpense}>Add Expense</button>
      </section>
      <section>
        <div>
          <h1 className="savings-result">
            Annual Savings: ${savings.toLocaleString()}
          </h1>
        </div>
      </section>
    </>
  )
}

export default FormField
