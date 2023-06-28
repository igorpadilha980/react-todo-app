import TaskList from './index'

const meta = {
    component: TaskList
}

export default meta

export const Normal = {
    args: {
        tasks: [
            {
                id: 0,
                title: "Task title",
                description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima omnis aliquam itaque eveniet earum aut quae, illo quaerat a ut, sapiente sequi, eius iusto animi deserunt rerum. Maiores, sunt nobis.`, 
                completed: false
            },
            {
                id: 1,
                title: 'Another task',
                description: 'This is a completed task',
                completed: true
            }
        ],
        onRemoveTask: (taskId) => alert(`Removing task: ${taskId}`),
        onEditTask: (task) => alert(`Removing task: ${task.title}`)
    }
}  