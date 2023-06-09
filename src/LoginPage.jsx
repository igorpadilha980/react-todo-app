import { useAuth } from './contexts/AuthContext'
import { layout, dataForm } from './user-data-form.module.css'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (submitEvent) => {
        const formData = new FormData(submitEvent.target)

        const email = formData.get('email')
        const password = formData.get('password')

        signIn(email, password)
            .then(() => navigate('/'))
            .catch((e) => {
                console.error(e)
                alert('Invalid credentials')
            })

        submitEvent.preventDefault()
    }

    return (
        <section className={layout}>
            <main>
                <h1>Login for ToDo</h1>
                <form onSubmit={handleSubmit} className={dataForm}>
                    <label>
                        E-mail:
                        <input type="email" name="email" placeholder="Your account e-mail" required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" placeholder="Yout Password" required />
                    </label>
                    <button>Login</button>
                    <span>Doesn't have an account? Register <Link to="/signup">here</Link></span>
                </form>
            </main>
        </section>
    )
}


export default LoginPage;