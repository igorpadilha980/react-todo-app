import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const env = import.meta.env;

const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGE_SENDER,
    appId: env.VITE_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig)
const firestore = getFirestore(firebaseApp)

console.log('firebase app:', firebaseApp)
console.log('firestore:', firestore)

export {
    firebaseApp,
    firestore
}