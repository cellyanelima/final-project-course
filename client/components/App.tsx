import IncomeExpenseChart from './IncomeExpenseChart'
import FormField from './Form.tsx'

function App() {
  return (
    <>
      <div>
        <IncomeExpenseChart />
      </div>
      <div className="app">
        <h1>My PiggyPal</h1>
      </div>
      <div>
        <FormField />
      </div>
    </>
  )
}

export default App
