import React, { useState } from 'react'

import { useFinancialCalculations } from '../hooks/useFinancialCalculations'
import { TransactionData } from '../../models/transaction'
import { addNewExpense } from '../apis/apiClient'

interface ExpenseForm {
  description: string
  amount: number
  frequency:
    | 'One-Off Expense'
    | 'Daily'
    | 'Weekly'
    | 'Fortnightly'
    | 'Monthly'
    | 'Annually'
}

const FormField: React.FC = () => {
  const [income, setIncome] = useState<number>(0)
  const [expenses, setExpenses] = useState<ExpenseForm[]>([
    { description: '', amount: 0, frequency: 'Monthly' },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { savings } = useFinancialCalculations(income, expenses)

  const addExpense = () => {
    setExpenses([
      ...expenses,
      { description: '', amount: 0, frequency: 'Monthly' },
    ])
  }

  const deleteExpense = (index: number) => {
    setExpenses(expenses.filter((_, idx) => idx !== index))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const transactionData: TransactionData[] = expenses.map((expense) => ({
        user_id: 1,
        description: expense.description.trim(),
        amount: expense.amount,
        frequency: expense.frequency,
        type: 'expense',
      }))

      if (
        transactionData.some(
          (exp) =>
            !exp.description || exp.amount <= 0 || !exp.frequency || !exp.type,
        )
      ) {
        alert('Please fill all fields correctly before submitting.')
        setIsSubmitting(false)
        return
      }

      console.log('Submitting expenses:', transactionData)

      for (const expense of transactionData) {
        await addNewExpense(expense)
      }

      alert('Expenses submitted successfully!')
      setExpenses([{ description: '', amount: 0, frequency: 'Monthly' }]) // Limpa o formulário
    } catch (error) {
      console.error('Error submitting expenses:', error)
      alert('Failed to submit expenses.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <section className="income">
        <label htmlFor="income">Income:</label>
        <input
          type="number"
          id="income"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
        />
      </section>
      <br />
      <section className="expenses">
        <h2>Expenses</h2>
        {expenses.map((expense, index) => (
          <div key={index} className="expense-row">
            <label htmlFor={`description-${index}`}>Description:</label>
            <input
              type="text"
              id={`description-${index}`}
              value={expense.description}
              onChange={(e) => {
                const newExpenses = [...expenses]
                newExpenses[index].description = e.target.value
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
                newExpenses[index].frequency = e.target
                  .value as ExpenseForm['frequency']
                setExpenses(newExpenses)
              }}
            >
              <option value="One-Off Expense">One-Off Expense</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Fortnightly">Fortnightly</option>
              <option value="Monthly">Monthly</option>
              <option value="Annually">Annually</option>
            </select>

            <button onClick={() => deleteExpense(index)}>Delete</button>
          </div>
        ))}

        <button onClick={addExpense}>Add Expense</button>
        <button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Expenses'}
        </button>
      </section>

      <section>
        <h2>Annual Savings</h2>
        <div>
          <h1>${savings.toLocaleString()}</h1>
        </div>
      </section>
    </div>
  )
}

export default FormField
