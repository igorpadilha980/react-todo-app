import { useEffect, useRef, useState } from 'react'

import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import Dialog from '../components/Dialog/Dialog'

import './app.css'
import { useAuth } from '../state/auth'
import { Navigate } from 'react-router-dom'
import { Button } from '../components/Button'

import AddIcon from '@mui/icons-material/Add';
import { useTaskService } from '../state/tasks'


function Home() {
  const { isSigned, user } = useAuth()
  const [tasks, setTasks] = useState([])
  const taskService = useTaskService()

  const [editingTask, setEditingTask] = useState(null)
  const dialogRef = useRef(null)

  const fetchTasks = (user, updateFunction) => {
    if (user)
      taskService.fetchTasks().then(updateFunction)
  }

  useEffect(() => fetchTasks(user, setTasks), [user])

  useEffect(() => {
    if (!dialogRef.current)
      return

    if (editingTask)
      dialogRef.current.openModal()
    else
      dialogRef.current.close()
  }, [editingTask])

  if (!isSigned()) {
    console.log('Login required to access home')
    return <Navigate to="/login" />
  }

  const closeForm = () => {
    if (editingTask) {
      setEditingTask(null)
    }

    dialogRef.current.close()
  }

  const submitForm = (task) => {
    if (editingTask)
      taskChange(editingTask.id, task)
    else {
      taskService.addTask(task)
        .then(createdTask => {
          setTasks([createdTask, ...tasks])
          closeForm()
        })
    }
  }

  const taskChange = (taskId, newData) => {
    taskService.updateTask(taskId, newData)
      .then(() => fetchTasks(user, setTasks))
      .then(closeForm)
  }

  const deleteTask = (taskId) => {
    taskService.deleteTask(taskId)
      .then(() => fetchTasks(user, setTasks))
  }

  return (
    <>
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
    </>
  )
}

export default Home
