import React from 'react'
import FormField from './Form'
import Goals from './Goals'
import IncomeExpenseChart from './IncomeExpenseChart'

function App() {
  return (
    <div className="app">
      <h1>My PiggyPal</h1>
      <FormField />
      <Goals />
      <IncomeExpenseChart />
    </div>
  )
}

export default App
