import { Pie } from 'react-chartjs-2'
import { useUserData } from '../hooks/useUserData'
import { Transaction } from '../../models/transaction'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = () => {
  const { data, isLoading, error } = useUserData()

  if (isLoading) return <p>Loading chart...</p>
  if (error instanceof Error) return <p>Error loading data: {error.message}</p>
  if (!data) return <p>Error: data not found.</p>

  const expenses = data.transactions.filter(
    (transaction: Transaction) => transaction.type === 'expense',
  )

  const chartLabels = expenses.map(
    (expense) => `${expense.description} (${expense.frequency})`,
  )
  const chartValues = expenses.map((expense) => Number(expense.amount))

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartValues,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: {
        position: 'right' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const value = context.raw as number
            return `R$ ${value.toFixed(2)}`
          },
        },
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
      <h2>Expenses by Description and Frequency</h2>
      <Pie data={chartData} options={chartOptions} />
    </div>
  )
}

export default PieChart
