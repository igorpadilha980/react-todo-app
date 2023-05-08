import { useState } from 'react'
import Task from './task/Task'
import TaskForm from './task/TaskForm'

function App() {
  const [ tasks, setTasks ] = useState([
    <Task title="Task to do" description="test" />
  ])

  const addTask = (task) => {
    task = <Task {...task} />
    setTasks([ task, ...tasks ])
  }

  return (
    <>
      <TaskForm onSubmit={addTask}/>
      { tasks }
    </>
  )
}

export default App
