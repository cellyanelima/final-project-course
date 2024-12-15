import { Pie } from 'react-chartjs-2'
import { useUserData } from '../hooks/useUserData'
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

const PieChart = () => {
  const { data, isLoading, error } = useUserData()
  //console.log('Hook data:', data)

  if (isLoading) {
    return <p>Loading chart...</p>
  }

  if (error instanceof Error) {
    return <p>Error loading data: {error.message}</p>
  }

  if (!data) {
    return <p>Error: data not found.</p>
  }

  let totalIncome = 0
  let totalExpense = 0
  data.transactions.forEach((e) => {
    if (e.type === 'income') totalIncome += e.amount
    if (e.type === 'expense') totalExpense += e.amount
  })
  console.log(totalExpense)

  const chartData = {
    labels: [data.name],
    datasets: [
      {
        label: 'Income',
        data: [totalIncome],
        backgroundColor: 'green',
      },
      {
        label: 'Expenses',
        data: [totalExpense],
        backgroundColor: 'red',
      },
    ],
  }

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <h2>Income and expenses by user</h2>
      <Pie
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

export default PieChart
