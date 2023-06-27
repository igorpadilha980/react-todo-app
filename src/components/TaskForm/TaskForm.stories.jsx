import TaskForm from "./TaskForm"

const meta = {
    component: TaskForm,
    decorators: [
        (Story) => (
            <div style={{ maxWidth:'800px' }}>
                <Story />
            </div>
        )
    ] 
}

export default meta

export const Normal = {
    args: {
        title: 'Task Form',
        submitText: 'Save task',
        onSubmit: () => alert('Form submited!')
    }
}

export const Filled = {
    args: {
        title: 'Edit task',
        submitText: 'Save changes',
        data: {
            title: 'Edit task form',
            description: 'Save changes from tasks'
        },
        onSubmit: () => alert('Changes saved!')
    }
}