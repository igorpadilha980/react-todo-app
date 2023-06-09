import { useEffect, useRef, useState } from 'react'

import Navbar from './components/Navbar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

import taskService from './services/tasks'

import './app.css'
import { useAuth } from './auth/AuthContext'
import { Navigate } from 'react-router-dom'

function fetchTasks(user, updateFunction) {
  if (user)
    taskService.allTasks(user.id).then(updateFunction)
}

function App() {
  const { isSigned, user } = useAuth()
  const [tasks, setTasks] = useState([])

  useEffect(() => fetchTasks(user, setTasks), [])
  const dialogRef = useRef()


  if (!isSigned()) {
    console.log('Login required to access home')
    return <Navigate to="/login" />
  }

  const newTask = (task) => {
    taskService.createTask(user.id, task)
      .then(createdTask => {
        setTasks([ createdTask, ...tasks ])
        dialogRef.current.close()
      })
  }

  const taskChange = (taskId, newStatus) => {
    taskService.updateTaskStatus(user.id, taskId, newStatus)
      .then(() => fetchTasks(user, setTasks))
  }

  const deleteTask = (taskId) => {
    taskService.deleteTask(user.id, taskId)
      .then(() => fetchTasks(user, setTasks))
  }

  const openForm = () => {
    dialogRef.current.showModal()
  }

  const closeForm = () => {
    dialogRef.current.close()
  }

  return (
    <section className='page-layout'>
      <Navbar />

      <dialog ref={dialogRef}>
        <button onClick={closeForm}>Close</button>
        <TaskForm onSubmit={newTask} />
      </dialog>

      <main className="tasks-display">
        <button onClick={openForm}>Add task</button>
        <TaskList tasks={tasks} updateTaskStatus={taskChange} onRemoveTask={deleteTask} />
      </main>
    </section>
  )
}

export default App
