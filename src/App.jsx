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

  const logTaskChange = (taskId, newStatus) => {
    console.log(`tasks ${taskId} status: ${newStatus}`)
  }

  return (
    <>
      <TaskForm onSubmit={newTask}/>
      <TaskList tasks={tasks} updateTaskStatus={logTaskChange}/>
    </>
  )
}

export default App
