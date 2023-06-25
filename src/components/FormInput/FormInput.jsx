import style from './FormInput.module.css'

function FormInput({ labelText , children }) {
    return (
        <label className={style.formInput}>
            <span className={style.title}>{labelText}</span>
            {children}
        </label>
    )
}

export default FormInput