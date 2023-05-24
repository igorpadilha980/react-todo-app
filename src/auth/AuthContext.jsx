import { createContext, useContext, useState } from "react"
import { login, logout } from './auth'

const authContext = createContext()

function AuthProvider({ children }) {
    const [ user, setUser ] = useState(null)

    const signIn = async (email, password) => {
        return login(email, password)
                .then(setUser)
    }

    const signOut = async () => logout().then(() => setUser(null))

    const isSigned = () => user != null

    return (
        <authContext.Provider value={{
            user,
            signIn,
            signOut,
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