import Task from "./Task"

import './task-list.css'

function TaskListItem({ task, onStatusUpdate }) {

    const handleStatusChange = (changeEvent) => {
        const newStatus = changeEvent.target.checked

        onStatusUpdate && onStatusUpdate(task.id, newStatus)
    }

    return (
        <li key={task.id} className="item">
            <input type="checkbox" checked={task.completed} onChange={handleStatusChange}/>
            <Task {...task}/>    
        </li>
    )
}

function TaskList({ tasks, updateTaskStatus }) {
    const taskItems = []

    tasks
        .map(task => TaskListItem({
            task,
            onStatusUpdate: updateTaskStatus
        }))
        .forEach(taskItem => taskItems.push(taskItem))

    return (
        <ul className="task-list">
            {...taskItems}
        </ul>
    )
}

export default TaskList