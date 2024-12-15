import React, { useState } from 'react'

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

  const addExpense = () => {
    setExpenses([...expenses, { expense: '', amount: 0, frequency: 'Monthly' }])
  }

  const deleteExpense = (index: number) => {
    const updatedExpenses = expenses.filter((_, idx) => idx !== index)
    setExpenses(updatedExpenses)
  }

  const calculateAnnualExpenses = (): number => {
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

  const calculateSavings = (): number => {
    return income - calculateAnnualExpenses()
  }

  return (
    <>
      <section className="income">
        <div>
          <label htmlFor="income">Income:</label>
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
              onChange={(e) =>
                setExpenses(
                  expenses.map((item, idx) =>
                    idx === index ? { ...item, expense: e.target.value } : item,
                  ),
                )
              }
            />
            <label htmlFor={`amount-${index}`}>Amount:</label>
            <input
              type="number"
              id={`amount-${index}`}
              value={expense.amount}
              onChange={(e) =>
                setExpenses(
                  expenses.map((item, idx) =>
                    idx === index
                      ? { ...item, amount: Number(e.target.value) }
                      : item,
                  ),
                )
              }
            />
            <label htmlFor={`frequency-${index}`}>Frequency:</label>
            <select
              id={`frequency-${index}`}
              value={expense.frequency}
              onChange={(e) =>
                setExpenses(
                  expenses.map((item, idx) =>
                    idx === index
                      ? { ...item, frequency: e.target.value }
                      : item,
                  ),
                )
              }
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
            Annual Savings: ${calculateSavings()}
          </h1>
        </div>
      </section>
    </>
  )
}

export default FormField
