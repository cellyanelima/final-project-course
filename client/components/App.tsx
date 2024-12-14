import { useFruits } from '../hooks/useFruits.ts'
import FormField from './Form.tsx'

function App() {
  return (
    <>
      <div className="app">
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        <FormField />
      </div>
    </>
  )
}

export default App
