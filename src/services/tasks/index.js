import firebaseService from './firebaseTasks'

function firebaseTaskService(userId) {
    return {
        fetchTasks: async () => firebaseService.allTasks(userId),
        addTask: async (taskData) => firebaseService.createTask(userId, taskData),
        updateTask: async (taskId, newData) => firebaseService.updateTask(userId, taskId, newData),
        setStatus: async (taskId, newStatus) => firebaseService.setStatus(userId, taskId, newStatus),
        deleteTask: async (taskId) => firebaseService.deleteTask(userId, taskId)
    }
}

export {
    firebaseTaskService
}