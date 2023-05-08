import './styles/task.css'

function Task({ title, description }) {
    return (
        <div className="task">
            <h3 className="title">{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default Task;