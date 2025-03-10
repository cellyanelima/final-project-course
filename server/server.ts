import express from 'express'
import * as Path from 'node:path'
import usersRoutes from './routes/users.ts'
import incomesRoutes from './routes/incomes.ts'
import expensesRoutes from './routes/expenses.ts'
//import goalsRoutes from './routes/goals.ts'
import overviewRoutes from './routes/overview'

const server = express()

server.use(express.json())

server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/incomes', incomesRoutes)
server.use('/api/v1/expenses', expensesRoutes)
//server.use('/api/v1/goals', goalsRoutes)
server.use('/api/v1/overview', overviewRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
