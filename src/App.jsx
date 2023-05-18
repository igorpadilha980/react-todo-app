import { useRef, useState } from 'react'

import { Navbar } from './page/Navbar'

import TaskForm from './task/TaskForm'
import TaskList from './task/TaskList'

import taskService from './task/task-service'

import { firebaseApp } from './firebase/firebase'

import './app.css'

function App() {
  const [tasks, setTasks] = useState(taskService.allTasks())

  const newTask = (task) => {
    taskService.createTask(task)
    setTasks(taskService.allTasks())

    dialogRef.current.close()
  }

  const taskChange = (taskId, newStatus) => {
    taskService.updateTaskStatus(taskId, newStatus)
    setTasks(taskService.allTasks())
  }

  const deleteTask = (taskId) => {
    taskService.deleteTask(taskId)
    setTasks(taskService.allTasks())
  }

  const dialogRef = useRef()

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
