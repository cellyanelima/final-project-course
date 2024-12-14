import { useFruits } from '../hooks/useFruits.ts'
import FormField from './Form.tsx'

function App() {
  const { data } = useFruits()

  return (
    <>
      <div className="app">
        <h1>My PiggyPal</h1>
        <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul>
      </div>
      <div>
        <FormField />
      </div>
    </>
  )
}

export default App
