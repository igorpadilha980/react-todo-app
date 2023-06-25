import { useRef } from 'react'

import style from './Form.module.css'

function Form({ title, onSubmit, children }) {
    const formRef = useRef(null)

    const handleSubmit = (submitEvent) => {
        const formData = new FormData(formRef.current)
        onSubmit && onSubmit(formData)
        
        submitEvent.preventDefault()
    }

    return (
        <form ref={formRef} className={style.form} onSubmit={handleSubmit}>
            <h1 className={style.formTitle}>{title}</h1>
            {children}
        </form>
    )
}

export default Form