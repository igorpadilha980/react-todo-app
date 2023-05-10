import { useState } from 'react'

import TaskForm from './task/TaskForm'
import TaskList from './task/TaskList'

import taskService from './task/task-service'

function App() {
  const [ tasks, setTasks ] = useState(taskService.allTasks())

  const newTask = (task) => {
    taskService.createTask(task)
    setTasks(taskService.allTasks())
  }

  const taskChange = (taskId, newStatus) => {
    taskService.updateTaskStatus(taskId, newStatus)
    setTasks(taskService.allTasks())
  }

  const deleteTask = (taskId) => {
    taskService.deleteTask(taskId)
    setTasks(taskService.allTasks())
  }

  return (
    <>
      <TaskForm onSubmit={newTask}/>
      <TaskList tasks={tasks} updateTaskStatus={taskChange} onRemoveTask={deleteTask}/>
    </>
  )
}

export default App
