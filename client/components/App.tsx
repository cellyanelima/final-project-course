import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import FormField from './FormField.tsx'
import BarChart from './BarChart.tsx'
import Overview from './Overview'
import PieChart from './PieChart.tsx'
//import Goals from './Goals'
//import PieChart from './PieChart.tsx'
//import { calculateAnnualExpenses } from '../hooks/useFinancialCalculations'
//import IncomeExpenseChart from './IncomeExpenseChart'
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
              {/* Link to Overview Page */}
              <div className="overview-link">
                <Link to="/overview?user_id=1">
                  Check User Financial Overview
                </Link>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
