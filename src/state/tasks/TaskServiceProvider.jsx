import { useEffect, useState } from 'react'
import TaskServiceContext from './TaskServiceContext'
import { useAuth } from '../auth'
import { firebaseTaskService } from '../../services/tasks'

function TaskServiceProvider({ children }) {
    const { user } = useAuth()
    const [ taskService, setTaskService ] = useState(null)

    useEffect(() => {
        if (user)
            setTaskService(firebaseTaskService(user.id))
        else
            setTaskService(null)
    }, [user])

    return (
        <TaskServiceContext.Provider value={{ taskService, setTaskService }}>
            {children}
        </TaskServiceContext.Provider>
    )
}

export default TaskServiceProvider