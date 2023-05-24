import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import { layout, dataForm } from './user-data-form.module.css'

function SignUpPage() {
    const { signUp } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (submitEvent) => {
        const formData = new FormData(submitEvent.target)

        const username = formData.get('username')
        const email = formData.get('email')
        const password = formData.get('password')

        signUp(username, email, password)
            .then(() => navigate('/'))
            .catch((e) => { 
                console.error(e)
                alert('Invalid data')
            })

        submitEvent.preventDefault()
    }

    return (
        <section className={layout}>
            <main>
                <h1>New account for ToDo</h1>
                <form onSubmit={handleSubmit} className={dataForm}>
                    <label>
                        Username:
                        <input type="text" name="username" placeholder="Your username" required />
                    </label>
                    <label>
                        E-mail:
                        <input type="email" name="email" placeholder="E-mail for this account" required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" placeholder="Yout Password" required />
                    </label>
                    <button>Sign up</button>
                </form>
            </main>
        </section>
    )
}

export {
    SignUpPage
}