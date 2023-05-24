import { layout, loginForm } from './login.module.css'
import { login } from './auth/auth'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const navigate = useNavigate()

    const handleSubmit = (submitEvent) => {
        const formData = new FormData(submitEvent.target)

        const email = formData.get('email')
        const password = formData.get('password')

        login(email, password)
            .then(() => navigate('/'))
            .catch(() => alert('Invalid credentials'))

        submitEvent.preventDefault()
    }

    return (
        <section className={layout}>
            <main>
                <h1>Login for ToDo</h1>
                <form onSubmit={handleSubmit} className={loginForm}>
                    <label>
                        E-mail:
                        <input type="email" name="email" placeholder="Your account e-mail" required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" placeholder="Yout Password" required />
                    </label>
                    <button>Login</button>
                </form>
            </main>
        </section>
    )
}


export default LoginPage;