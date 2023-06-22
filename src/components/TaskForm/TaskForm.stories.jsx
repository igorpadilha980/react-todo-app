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

export const Primary = {
    args: {
        title: 'Task Form',
        submitText: 'Save task',
        onSubmit: () => alert('Form submited!')
    }
}