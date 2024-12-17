import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserData } from '../hooks/useUserData'
import { deleteIncome } from '../apis/apiClient'

export default function IncomeList() {
  const { data, isLoading, isError } = useUserData()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteIncome(id),
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

  const transactions = data.transactions.filter((t) => t.type == 'income')

  return (
    <div>
      <section className="income">
        <h2>Incomes</h2>
        <table>
          <tr>
            <td>ID</td>
            <td>Description</td>
            <td>Amount</td>
            <td>Frequency</td>
            <td>Action</td>
          </tr>
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
        </table>
      </section>
    </div>
  )
}
