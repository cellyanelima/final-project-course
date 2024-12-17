import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FormField from './FormField.tsx'
import BarChart from './BarChart.tsx'
import Overview from './Overview'
import PieChart from './PieChart.tsx'
//import Goals from './Goals'
import '../styles/index.scss'
import IncomeList from './IncomeList.tsx'
import ExpenseList from './ExpenseList.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/overview" element={<Overview />} />
        <Route
          path="/"
          element={
            <div className="app">
              <h1 className="title">My PiggyPal</h1>
              <IncomeList />
              <ExpenseList />
              <FormField />
              <div className="graphs-container">
                <div className="graph-box">
                  <BarChart />
                </div>
                <div className="graph-box">
                  <PieChart />
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
