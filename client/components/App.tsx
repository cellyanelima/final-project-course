import FormField from './Form'
//import Goals from './Goals'
import BarChart from './BarChart.tsx'
//import PieChart from './PieChart.tsx'
//import { calculateAnnualExpenses } from '../hooks/useFinancialCalculations'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Overview from './Overview'
//import IncomeExpenseChart from './IncomeExpenseChart'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/overview" element={<Overview />} />
        <Route
          path="/"
          element={
            <>
              {/* <div>
                <IncomeExpenseChart />
              </div> */}
              <div className="app">
                <h1>My PiggyPal</h1>
              </div>
              <div>
                <FormField />
              </div>
              <BarChart />
            </>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
