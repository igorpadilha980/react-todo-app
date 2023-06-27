import TaskCard from "../TaskCard"

import DeleteIcon from '@mui/icons-material/DeleteSharp';
import EditIcon from '@mui/icons-material/EditSharp';

import './task-list.css'

function TaskListItem({ task, onStatusUpdate, onRemove, onEdit }) {

    const handleStatusChange = (changeEvent) => {
        const newStatus = changeEvent.target.checked

        onStatusUpdate && onStatusUpdate(task.id, newStatus)
    }

    const handleDeleteClick = () => onRemove && onRemove(task.id)

    const handleEditClick = () => onEdit && onEdit(task)

    return (
        <li key={task.id} className="item">
            <input type="checkbox" checked={task.completed} onChange={handleStatusChange} className="status"/>
            <TaskCard {...task} className="task"/>
            <div className="options">
                <button onClick={handleEditClick}><EditIcon /></button>    
                <button onClick={handleDeleteClick}><DeleteIcon /></button>    
            </div>
        </li>
    )
}

function TaskList({ tasks, updateTaskStatus, onRemoveTask, onEditTask }) {
    const taskItems = []

    tasks
        .map(task => TaskListItem({
            task,
            onStatusUpdate: updateTaskStatus,
            onRemove: onRemoveTask,
            onEdit: onEditTask
        }))
        .forEach(taskItem => taskItems.push(taskItem))

    return (
        <ul className="task-list">
            {taskItems}
        </ul>
    )
}

export default TaskList