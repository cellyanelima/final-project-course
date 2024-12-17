import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { useFinancialCalculations } from '../hooks/useFinancialCalculations'
import { TransactionData, TransactionForm } from '../../models/transaction'
import { addNewExpense, addNewIncome } from '../apis/apiClient'

const FormField: React.FC = () => {
  const [income] = useState<number>(0)
  const [transactions, setTransaction] = useState<TransactionForm[]>([
    { description: '', amount: 0, frequency: 'Monthly', type: 'expense' },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const queryClient = useQueryClient()

  const { savings } = useFinancialCalculations(income, transactions)

  const addTransaction = () => {
    setTransaction([
      ...transactions,
      { description: '', amount: 0, frequency: 'Monthly', type: 'expense' },
    ])
  }

  const deleteTransaction = (index: number) => {
    setTransaction(transactions.filter((_, idx) => idx !== index))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const transactionData: TransactionData[] = transactions.map(
        (transaction) => ({
          user_id: 1,
          description: transaction.description.trim(),
          amount: transaction.amount,
          frequency: transaction.frequency,
          type: transaction.type,
        }),
      )

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

      console.log('Submitting transactions:', transactionData)

      transactionData.forEach((t) => {
        if (t.type === 'income') addNewIncome(t)
        if (t.type === 'expense') addNewExpense(t)
      })

      setTransaction([
        { description: '', amount: 0, frequency: 'Monthly', type: 'expense' },
      ])

      queryClient.invalidateQueries({ queryKey: ['user'] })
    } catch (error) {
      console.error('Error submitting transactions:', error)
      alert('Failed to submit transactions.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <section className="transactions">
        <h2>New Income/Expense</h2>
        {transactions.map((transaction, index) => (
          <div key={index} className="expense-row">
            <label htmlFor={`description-${index}`}>Description:</label>
            <input
              type="text"
              id={`description-${index}`}
              value={transaction.description}
              onChange={(e) => {
                const newTransactions = [...transactions]
                newTransactions[index].description = e.target.value
                setTransaction(newTransactions)
              }}
            />

            <label htmlFor={`amount-${index}`}>Amount:</label>
            <input
              type="number"
              id={`amount-${index}`}
              value={transaction.amount}
              onChange={(e) => {
                const newTransactions = [...transactions]
                newTransactions[index].amount = Number(e.target.value)
                setTransaction(newTransactions)
              }}
            />

            <label htmlFor={`frequency-${index}`}>Frequency:</label>
            <select
              id={`frequency-${index}`}
              value={transaction.frequency}
              onChange={(e) => {
                const newTransactions = [...transactions]
                newTransactions[index].frequency = e.target
                  .value as TransactionForm['frequency']
                setTransaction(newTransactions)
              }}
            >
              <option value="One-Off Expense">One-Off Expense</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Fortnightly">Fortnightly</option>
              <option value="Monthly">Monthly</option>
              <option value="Annually">Annually</option>
            </select>

            <label htmlFor={`type-${index}`}>Type:</label>
            <select
              id={`type-${index}`}
              value={transaction.type}
              onChange={(e) => {
                const newTransactions = [...transactions]
                newTransactions[index].type = e.target
                  .value as TransactionForm['type']
                setTransaction(newTransactions)
              }}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <button onClick={() => deleteTransaction(index)}>Remove</button>
          </div>
        ))}

        <button onClick={addTransaction}>Add Expense</button>
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
