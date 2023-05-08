import TaskForm from './task/TaskForm'
import useTaskList from './task/TaskList'

function App() {
  const { TaskList, tasks, addTask } = useTaskList([
    {
      id: 1,
      title: 'Task to do',
      description: 'test'
    }
  ])

  return (
    <>
      <TaskForm onSubmit={addTask}/>
      <TaskList tasks={tasks}/>
    </>
  )
}

export default App
