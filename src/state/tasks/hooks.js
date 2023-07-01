import { useContext } from "react";
import TaskServiceContext from "./TaskServiceContext";

function useTaskService() {
    return useContext(TaskServiceContext)
}

export {
    useTaskService
}