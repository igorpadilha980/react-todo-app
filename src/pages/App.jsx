import { useEffect, useRef, useState } from 'react'

import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import Dialog from '../components/Dialog/Dialog'

import taskService from '../services/tasks'

import './app.css'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import { Button } from '../components/Button'

import AddIcon from '@mui/icons-material/Add';

function fetchTasks(user, updateFunction) {
  if (user)
    taskService.allTasks(user.id).then(updateFunction)
}

function App() {
  const { isSigned, user } = useAuth()
  const [tasks, setTasks] = useState([])

  useEffect(() => fetchTasks(user, setTasks), [])
  const dialogRef = useRef(null)


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

  return (
    <section className='page-layout'>
      <Navbar />

      <Dialog ref={dialogRef} closeAction={() => dialogRef.current.close()} className="task-dialog">
        <TaskForm title="New task" submitText={"Save"} onSubmit={newTask} />
      </Dialog>

      <main className="tasks-display">
        <Button action={() => dialogRef.current.openModal()} round paddingRight="10px"><AddIcon /> New</Button>
        <TaskList tasks={tasks} updateTaskStatus={taskChange} onRemoveTask={deleteTask} />
      </main>
    </section>
  )
}

export default App
