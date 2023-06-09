import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebase.js'
import { createUser, fetchUser } from './user.js'

async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
            .then(credential => fetchUser(credential.user.uid))
}

async function logout() {
    return signOut(auth)
}

async function registerUser(username, email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((credential) => createUser(credential.user.uid, username, email))
}

export {
    login,
    logout,
    registerUser
}