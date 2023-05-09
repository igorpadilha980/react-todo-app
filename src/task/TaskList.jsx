import Task from "./Task"

function TaskList({tasks}) {
    const taskItems = []

    tasks
        .map(t => Task({key: t.id, ...t}))
        .forEach(task => taskItems.push(task))

    return (
        <ul className="task-list">
            {...taskItems}
        </ul>
    )
}

export default TaskList