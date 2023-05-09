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
    console.log("creating task:", taskData)

    tasks.set(tasks.size+1, taskData)
}

function updateTaskStatus(taskId, newStatus) {
    console.log(`updating task ${taskId}, status: ${newStatus}`)

    const task = tasks.get(taskId)
    task.completed = newStatus
}

export default {
    allTasks,
    updateTaskStatus,
    createTask
}