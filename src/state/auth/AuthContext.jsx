import { createContext, useContext, useEffect, useState } from "react"
import { login, logout, registerUser, watchAuthChange } from '../../services/auth'

const AuthContext = createContext()

function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined)

    useEffect(() => watchAuthChange(setUser), [])

    const signIn = async (email, password) => {
        return login(email, password)
            .then(setUser)
    }

    const signOut = async () => logout().then(() => setUser(null))

    const signUp = async (username, email, password) => {
        return registerUser(username, email, password).then((user) => {
            setUser(user)
        })
    }

    const isSigned = () => user != null && user != undefined

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut,
            signUp,
            isSigned
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    return useContext(AuthContext)
}


export {
    AuthProvider,
    useAuth,
    AuthContext
}