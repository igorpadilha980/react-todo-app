import { Button } from '../components/Button'

import style from './SelectStorage.module.css'

import { localTaskService } from '../services/tasks'

import { Navigate, useNavigate } from 'react-router-dom'
import { useTaskService } from '../state/tasks'

function SelectStorage() {
    const navigate = useNavigate()
    const { taskService, setTaskService } = useTaskService()

    const prepareFirebaseService = () => navigate('/login')    

    const prepareLocalService = () => setTaskService(localTaskService())
    console.log(taskService)

    if (taskService) {
        console.log('navigating to home')
        return <Navigate to="/home" />
    }


    return (
        <section className={style.container}>
            <h1>Choose your storage</h1>
            <div className={style.storages}>
                <Button className={style.option} action={prepareFirebaseService}>Cloud</Button>
                <Button className={style.option} action={prepareLocalService}>Local</Button>
            </div>
        </section>
    )
}

export default SelectStorage