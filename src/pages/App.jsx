import PageLayout from "../components/PageLayout";

import taskService from '../services/tasks'
import { useAuth } from "../state/auth";
import { TaskServiceProvider } from "../state/tasks";

import { Outlet } from "react-router-dom";

function App() {
    const { user } = useAuth()
    
    let service = {
        fetchTasks: async () => taskService.allTasks(user.id),
        addTask: async (taskData) => taskService.createTask(user.id, taskData),
        updateTask: async (taskId, newData) => taskService.updateTask(user.id, taskId, newData),
        deleteTask: async (taskId) => taskService.deleteTask(user.id, taskId)
    }

    return (
        <TaskServiceProvider service={service}>
            <PageLayout>
                <Outlet />
            </PageLayout>
        </TaskServiceProvider>
    )
}

export default App