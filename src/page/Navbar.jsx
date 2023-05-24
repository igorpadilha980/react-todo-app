import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext'

import './navbar.css'

function Navbar() {
    const { isSigned, signOut } = useAuth()

    return (
        <nav className='navbar'>
            Todo

            {
                isSigned() ?
                <button onClick={signOut}>Logout</button> :
                <Link to="/login">Login</Link>
            }
        </nav>
    )
}

export {
    Navbar
}