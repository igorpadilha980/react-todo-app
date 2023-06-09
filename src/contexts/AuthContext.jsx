import { createContext, useContext, useState } from "react"
import { login, logout, registerUser } from '../services/auth'

const authContext = createContext()

function AuthProvider({ children }) {
    const [ user, setUser ] = useState(null)

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

    const isSigned = () => user != null

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