import { useEffect, useState } from 'react'
import { Button } from '../Button'

import style from './TaskForm.module.css'

function TaskForm({ title, submitText, onSubmit, data }) {
    const [ formData, setFormData ] = useState({})

    useEffect(() => setFormData(data ?? {}), [data])

    const handleChange = (changeEvent) => {
        const { name, value } = changeEvent.target
        
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (submitEvent) => {
        onSubmit && onSubmit(formData)

        submitEvent.target.reset()
        submitEvent.preventDefault()
    }

    return (
        <form className={style.taskForm} onSubmit={handleSubmit}>
            <h1>{ title }</h1>
            <label>
                Task name
                <input 
                    className={style.control} 
                    type="text" 
                    name="title" 
                    placeholder="Task name"
                    value={data?.title}
                    onChange={handleChange}
                    required />
            </label>
            <label>
                Description
                <textarea 
                    className={style.control} 
                    name="description" 
                    placeholder="Description for this task"
                    value={data?.description}
                    onChange={handleChange}>
                </textarea>
            </label>
            <Button>{ submitText }</Button>
        </form>
    )
}

export default TaskForm