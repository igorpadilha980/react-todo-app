import TaskServiceContext from './TaskServiceContext'

function TaskServiceProvider({ service, children }) {
    return (
        <TaskServiceContext.Provider value={{
            ...service,
            setStatus: async (taskId, status) => service.editTask(taskId, { completed: status })
        }}>
            {children}
        </TaskServiceContext.Provider>
    )
}

export default TaskServiceProvider