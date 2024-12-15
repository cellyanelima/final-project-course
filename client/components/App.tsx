import FormField from './Form'
//import Goals from './Goals'
import BarChart from './BarChart.tsx'
//import PieChart from './PieChart.tsx'
//import { calculateAnnualExpenses } from '../hooks/useFinancialCalculations'

function App() {
  return (
    <div className="app">
      <h1>My PiggyPal</h1>
      <FormField />
      {/* <Goals /> */}
      <BarChart />
      {/* <PieChart /> */}
    </div>
  )
}

export default App
