import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import { Form } from '../components/Form'
import { FormInput } from '../components/FormInput'

import { userFormWrapper, actionButton, additionalLink } from './user-data-form.module.css'
import { Button } from '../components/Button'

function SignUpPage() {
    const { isSigned, signUp } = useAuth()

    if (isSigned())
        return <Navigate to="/home" />

    const requestRegistration = (formData) => {
        const username = formData.get('username')
        const email = formData.get('email')
        const password = formData.get('password')

        signUp(username, email, password)
            .catch((e) => {
                console.error(e)
                alert('Invalid data')
            })
    }

    return (
        <>
            <section className={userFormWrapper}>
                <Form title="Create account" onSubmit={requestRegistration}>
                    <FormInput labelText="Username">
                        <input type="text" name="username" placeholder="Your username" />
                    </FormInput>

                    <FormInput labelText="E-mail">
                        <input type="email" name="email" placeholder="Your account e-mail" required />
                    </FormInput>

                    <FormInput labelText="Password">
                        <input type="password" name="password" placeholder="Yout Password" required />
                    </FormInput>

                    <Button className={actionButton}>Register</Button>
                    <span className={additionalLink}>Already have an account? Login <Link to="/signup">here</Link></span>
                </Form>
            </section>
        </>
    )
}

export {
    SignUpPage
}