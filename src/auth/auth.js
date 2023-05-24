import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase.js'

async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
            .then(credential => credential.user)
}

export {
    login
}