import { useState } from 'react'
import TaskForm from './task/TaskForm'
import TaskList from './task/TaskList'

function App() {
  const [ tasks, setTasks ] = useState([
    {
      id: 1,
      title: 'Task to do',
      description: 'test'
    }
  ])

  const newTask = (task) => {
    setTasks([ task, ...tasks ])
  }

  return (
    <>
      <TaskForm onSubmit={newTask}/>
      <TaskList tasks={tasks}/>
    </>
  )
}

export default App
