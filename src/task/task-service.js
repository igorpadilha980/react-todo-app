const tasks = [
    {
        id: 1,
        title: 'Task todo',
        description: 'Sample task',
        completed: true
    },
    {
        id: 2,
        title: 'Some other task',
        description: 'Something pending',
        completed: false
    }
];

function allTasks() {
    return [ ...tasks ]
}

function updateTaskStatus(taskId, newStatus) {
    tasks[taskId - 1].completed = newStatus;
}

export default {
    allTasks,
    updateTaskStatus
}