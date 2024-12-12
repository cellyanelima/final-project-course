import { Bar } from 'react-chartjs-2'
import { useIncomeExpenseData } from '../hooks/useIncomeExpenseData'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const IncomeExpenseChart = () => {
  const { data, isLoading, error } = useIncomeExpenseData()
  //console.log('Hook data:', data)

  if (isLoading) {
    return <p>Loading chart...</p>
  }

  if (error instanceof Error) {
    return <p>Erro ao carregar dados: {error.message}</p>
  }

  if (!data) {
    return <p>Erro: dados não encontrados.</p>
  }

  const labels = data.map((item) => item.name)
  const incomeData = data.map((item) => item.totalIncome)
  const expenseData = data.map((item) => item.totalExpense)

  //console.log('Labels:', labels)
  //console.log('Income Data:', incomeData)
  //console.log('Expense Data:', expenseData)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: 'green',
      },
      {
        label: 'Expenses',
        data: expenseData,
        backgroundColor: 'red',
      },
    ],
  }

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <h2>Income and expenses by user</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  )
}

export default IncomeExpenseChart
