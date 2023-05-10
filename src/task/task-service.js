const tasks = new Map([
    [1, {
        id: 1,
        title: 'Task todo',
        description: 'Sample task',
        completed: true
    }],
    [2, {
        id: 2,
        title: 'Some other task',
        description: 'Something pending',
        completed: false
    }]
])

function allTasks() {
    return Array.from(tasks.values())
}

function createTask(taskData) {
    taskData.id = Date.now();
    taskData.completed = false;

    console.log("creating task:", taskData)
    tasks.set(taskData.id, taskData)
}

function updateTaskStatus(taskId, newStatus) {
    console.log(`updating task ${taskId}, status: ${newStatus}`)

    const task = tasks.get(taskId)
    task.completed = newStatus
}

function deleteTask(taskId) {
    console.log(`deleting task ${taskId}`)

    tasks.delete(taskId)
}

export default {
    allTasks,
    updateTaskStatus,
    createTask,
    deleteTask
}