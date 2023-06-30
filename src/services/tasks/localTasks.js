let tasks = {}

function loadTasks() {
    let tasksJson = localStorage.getItem('tasks')

    return tasksJson? JSON.parse(tasksJson) : {}
}

function syncStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

async function fetchTasks() {
    return Object.values(tasks);
}

async function addTask(task) {
    const id = Date.now()
    const newTask = { ...task, id, completed: false }

    tasks[id] = newTask
    return { ...newTask }
}

async function updateTask(taskId, newData) {
    tasks[taskId] = Object.assign(tasks[taskId], newData)
}

async function setStatus(taskId, newStatus) {
    updateTask(taskId, { completed: newStatus })
}

async function deleteTask(taskId) {
    delete tasks[taskId]
}

tasks = loadTasks()
setInterval(syncStorage, 1000)

export default {
    fetchTasks,
    addTask,
    updateTask,
    setStatus,
    deleteTask
}