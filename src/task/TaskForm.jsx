import { useState } from "react"

import './task-form.css'

function TaskForm({ onSubmit }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (submitEvent) => {
        onSubmit({
            title: title,
            description: description
        })

        submitEvent.preventDefault()
    }

    const updateState = (update) => {
        return (event) => update(event.target.value)
    }
    
    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h3>New task</h3>
            <input type="text" onChange={updateState(setTitle)} required />
            <textarea onChange={updateState(setDescription)}></textarea>
            <button>Add</button>
        </form>
    )
}

export default TaskForm