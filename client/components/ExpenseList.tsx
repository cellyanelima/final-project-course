import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserData } from '../hooks/useUserData'
import { deleteExpense } from '../apis/apiClient'

const ExpenseList: React.FC = () => {
  const { data, isLoading, isError } = useUserData()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteExpense(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
  })

  const handleDelete = (transactionId: number) => {
    deleteMutation.mutate(transactionId)
  }

  if (isError)
    return (
      <p className="error-message">An error occurred while fetching data.</p>
    )
  if (isLoading) return <p className="loading-message">Loading data...</p>
  if (!data) return <p className="error-message">No data found.</p>

  const transactions = data.transactions.filter((t) => t.type == 'expense')

  return (
    <section className="expense">
      <div>
        <h2>Expenses</h2>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Description</td>
              <td>Amount</td>
              <td>Frequency</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.description}</td>
                <td>{t.amount}</td>
                <td>{t.frequency}</td>
                <td>
                  <button onClick={() => handleDelete(t.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ExpenseList
