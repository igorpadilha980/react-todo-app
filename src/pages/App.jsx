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
  const [editingTask, setEditingTask] = useState(null)
  const dialogRef = useRef(null)

  useEffect(() => fetchTasks(user, setTasks), [])

  useEffect(() => {
    if (editingTask)
      dialogRef.current.openModal()
  }, [editingTask])

  if (!isSigned()) {
    console.log('Login required to access home')
    return <Navigate to="/login" />
  }

  const closeForm = () => {
    if (editingTask)
      setEditingTask(null)

    dialogRef.current.close()
  }

  const submitForm = (task) => {
    if (editingTask)
      console.log('Updating task!')
    else {
      taskService.createTask(user.id, task)
        .then(createdTask => {
          setTasks([createdTask, ...tasks])
          closeForm()
        })
    }
  }

  const taskChange = (taskId, newData) => {
    taskService.updateTask(user.id, taskId, newData)
      .then(() => fetchTasks(user, setTasks))
  }

  const deleteTask = (taskId) => {
    taskService.deleteTask(user.id, taskId)
      .then(() => fetchTasks(user, setTasks))
  }

  return (
    <section className='page-layout'>
      <Navbar />

      <Dialog ref={dialogRef} closeAction={closeForm} className="task-dialog">
        <TaskForm
          title={editingTask ? "Edit task" : "New task"}
          submitText={editingTask ? "Save changes" : "Save"}
          data={editingTask}
          onSubmit={submitForm} />
      </Dialog>

      <main className="tasks-display">
        <Button action={() => dialogRef.current.openModal()} round paddingRight="10px"><AddIcon /> New</Button>
        <TaskList 
          tasks={tasks} 
          updateTaskStatus={(id, completed) => taskChange(id, { completed })} 
          onRemoveTask={deleteTask} 
          onEditTask={setEditingTask} />
      </main>
    </section>
  )
}

export default App
