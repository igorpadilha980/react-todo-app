import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '../firebase/firebase.js'
import { collection, doc, getDoc } from 'firebase/firestore'

function docToUser(document) {
    const data = document.data()

    return {
        id: document.id,
        username: data.username,
        email: data.email
    }
}

async function fetchUser(uid) {
    const userDoc = doc(firestore, 'users', uid);

    return getDoc(userDoc).then(docToUser)
}

async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
            .then(credential => fetchUser(credential.user.uid))
}

export {
    login
}