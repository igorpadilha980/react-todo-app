import { createContext, useContext, useEffect, useState } from "react"
import { login, logout, registerUser, watchAuthChange } from '../services/auth'

const authContext = createContext()

function AuthProvider({ children }) {
    const [ user, setUser ] = useState(null)

    useEffect(() => watchAuthChange(setUser), [])

    const signIn = async (email, password) => {
        return login(email, password)
                .then(setUser)
    }

    const signOut = async () => logout().then(() => setUser(null))

    const signUp = async (username, email, password) => {
        return registerUser(username, email, password).then((user) => {
            console.trace('setting user: ', user)
            setUser(user)
        })
    }

    const isSigned = () => user != null && user != undefined

    return (
        <authContext.Provider value={{
            user,
            signIn,
            signOut,
            signUp,
            isSigned
        }}>
            {children}
        </authContext.Provider>
    ) 
}

function useAuth() {
    return useContext(authContext)
}


export {
    AuthProvider,
    useAuth
}