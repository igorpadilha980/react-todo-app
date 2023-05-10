import Task from "./Task"

import './task-list.css'

function TaskListItem({ task, onStatusUpdate, onRemove }) {

    const handleStatusChange = (changeEvent) => {
        const newStatus = changeEvent.target.checked

        onStatusUpdate && onStatusUpdate(task.id, newStatus)
    }

    const handleDeleteClick = () => onRemove && onRemove(task.id)

    return (
        <li key={task.id} className="item">
            <input type="checkbox" checked={task.completed} onChange={handleStatusChange}/>
            <Task {...task}/>
            <button onClick={handleDeleteClick}>Delete</button>    
        </li>
    )
}

function TaskList({ tasks, updateTaskStatus, onRemoveTask }) {
    const taskItems = []

    tasks
        .map(task => TaskListItem({
            task,
            onStatusUpdate: updateTaskStatus,
            onRemove: onRemoveTask
        }))
        .forEach(taskItem => taskItems.push(taskItem))

    return (
        <ul className="task-list">
            {...taskItems}
        </ul>
    )
}

export default TaskList