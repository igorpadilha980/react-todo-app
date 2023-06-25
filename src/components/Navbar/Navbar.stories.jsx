import { AuthContext } from "../../contexts/AuthContext";
import { Navbar } from "./Navbar";

const meta = {
    component: Navbar
}

export default meta

const Provider = ({ signed, children }) => {
    const value = {
        isSigned: () => signed,
        signOut: () => alert('Logout button clicked')
    }
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const SignedIn = {
    decorators: [
        (Story) => <Provider signed={true}><Story/></Provider>
    ]
}