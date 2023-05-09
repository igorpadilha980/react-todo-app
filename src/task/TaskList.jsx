import Task from "./Task"

import './task-list.css'

function TaskListItem({ task }) {
    return (
        <li key={task.id} className="item">
            <input type="checkbox" checked={task.completed} />
            <Task {...task}/>    
        </li>
    )
}

function TaskList({tasks}) {
    const taskItems = []

    tasks
        .map(task => TaskListItem({ task }))
        .forEach(taskItem => taskItems.push(taskItem))

    return (
        <ul className="task-list">
            {...taskItems}
        </ul>
    )
}

export default TaskList