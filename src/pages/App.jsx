import { useEffect } from "react";
import PageLayout from "../components/PageLayout";

import { firebaseTaskService, localTaskService } from "../services/tasks";

import { useAuth } from "../state/auth";
import { useTaskService } from "../state/tasks";

import { Outlet } from "react-router-dom";

function App() {
    const { user } = useAuth()
    const { taskService, setTaskService } = useTaskService()

    const loading = user && !taskService

    useEffect(() => {
        if (loading)
            setTaskService(localTaskService())
    }, [loading])

    return (
        <PageLayout>
            {
                loading? <h1>Loading...</h1> : <Outlet />
            }
        </PageLayout>
    )
}

export default App