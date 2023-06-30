import { useEffect } from "react";
import PageLayout from "../components/PageLayout";

import firebaseService from '../services/tasks'

import { useAuth } from "../state/auth";
import { useTaskService } from "../state/tasks";

import { Outlet } from "react-router-dom";

function App() {
    const { user } = useAuth()
    const { taskService, setTaskService } = useTaskService()

    useEffect(() => {
        if (!taskService && user) {
            let service = {
                fetchTasks: async () => firebaseService.allTasks(user.id),
                addTask: async (taskData) => firebaseService.createTask(user.id, taskData),
                updateTask: async (taskId, newData) => firebaseService.updateTask(user.id, taskId, newData),
                deleteTask: async (taskId) => firebaseService.deleteTask(user.id, taskId)
            }

            setTaskService(service)
        }
    }, [user])

    return (
        <PageLayout>
            <Outlet />
        </PageLayout>
    )
}

export default App