import { useState } from "react"
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


function useTaskList(content) {
    const [ tasks, setTasks ] = useState(content? content : [])

    const addTask = (task) => setTasks([ ...tasks, task ])

    return { 
        addTask, 
        TaskList,
        tasks
    }
}

export default useTaskList