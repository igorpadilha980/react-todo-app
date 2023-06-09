import './task.css'

function TaskCard({ title, description }) {
    return (
        <div className="task">
            <h3 className="title">{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default TaskCard;