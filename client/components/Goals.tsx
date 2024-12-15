import React, { useState } from 'react'

interface Goal {
  id: number
  title: string
  targetAmount: number
}

const Goals: React.FC<{ savings: number }> = ({ savings }) => {
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoal, setNewGoal] = useState({ title: '', targetAmount: 0 })

  const addGoal = () => {
    const nextId = goals.length > 0 ? goals[goals.length - 1].id + 1 : 1
    if (newGoal.title && newGoal.targetAmount > 0) {
      setGoals([...goals, { ...newGoal, id: nextId }])
      setNewGoal({ title: '', targetAmount: 0 })
    }
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof newGoal,
  ) => {
    const { value } = event.target
    setNewGoal({
      ...newGoal,
      [field]: field === 'targetAmount' ? parseFloat(value) : value,
    })
  }

  return (
    <div>
      <h2>Manage Your Goals</h2>
      {goals.map((goal, index) => (
        <div key={index}>
          <p>
            Goal: {goal.title}, Target Amount: ${goal.targetAmount}
          </p>
        </div>
      ))}
      <div>
        <label htmlFor="goal-title">Goal: </label>
        <input
          type="text"
          id="goal-title"
          value={newGoal.title}
          onChange={(e) => handleInputChange(e, 'title')}
          placeholder="Enter goal"
        />
        <label htmlFor="goal-amount"> Amount: </label>
        <input
          type="number"
          id="goal-amount"
          value={newGoal.targetAmount.toString()}
          onChange={(e) => handleInputChange(e, 'targetAmount')}
          placeholder="Enter target amount"
        />
        <button onClick={addGoal}>Add Goal</button>
      </div>
    </div>
  )
}

export default Goals
