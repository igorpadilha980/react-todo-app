import { useState } from 'react'
import TaskServiceContext from './TaskServiceContext'

function TaskServiceProvider({ children }) {
    const [ taskService, setTaskService ] = useState(null)

    return (
        <TaskServiceContext.Provider value={{ taskService, setTaskService }}>
            {children}
        </TaskServiceContext.Provider>
    )
}

export default TaskServiceProvider