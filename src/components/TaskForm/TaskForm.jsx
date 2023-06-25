import { Button } from '../Button'

import style from './TaskForm.module.css'

function TaskForm({ title, submitText, onSubmit }) {
    const handleSubmit = (submitEvent) => {
        submitEvent.preventDefault()

        if (!onSubmit)
            return;

        const data = new FormData(submitEvent.target)
        onSubmit(Object.fromEntries(data.entries()))

        submitEvent.target.reset()
    }

    return (
        <form className={style.taskForm} onSubmit={handleSubmit}>
            <h1>{ title }</h1>
            <label>
                Task name
                <input className={style.control} type="text" name="title" placeholder="Task name" required />
            </label>
            <label>
                Description
                <textarea 
                    className={style.control} 
                    name="description" 
                    placeholder="Description for this task">
                </textarea>
            </label>
            <Button>{ submitText }</Button>
        </form>
    )
}

export default TaskForm