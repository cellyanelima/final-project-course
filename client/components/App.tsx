import BarChart from './BarChart.tsx'
//import PieChart from './PieChart.tsx'
import FormField from './Form.tsx'

function App() {
  return (
    <>
      <div>
        <BarChart />
        {/* <PieChart /> */}
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
