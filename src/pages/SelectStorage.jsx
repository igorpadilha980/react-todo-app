import { Button } from '../components/Button'

import style from './SelectStorage.module.css'

function SelectStorage() {
    return (
        <section className={style.container}>
            <h1>Choose your storage</h1>
            <div className={style.storages}>
                <Button className={style.option}>Cloud</Button>
                <Button className={style.option}>Local</Button>
            </div>
        </section>
    )
}

export default SelectStorage