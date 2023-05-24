import { firestore } from '../firebase/firebase'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'

const userCollection = collection(firestore, 'users')

function docToUser(document) {
    const data = document.data()

    return {
        id: document.id,
        username: data.username,
        email: data.email
    }
}

async function fetchUser(userId) {
    console.log('fetching user data from ' + userId)

    const userDoc = doc(firestore, userCollection.path, userId)
    return getDoc(userDoc).then(docToUser)
}

async function createUser(id, username, email) {
    const userData = { username, email }

    const userDoc = doc(firestore, userCollection.path, id)
    return setDoc(userDoc, userData)
            .then(() => ({ ...userData, id }))
}

export {
    fetchUser,
    createUser
}