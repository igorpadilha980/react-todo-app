import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'

import style from './Navbar.module.css'

function Navbar() {
    const { isSigned, signOut } = useAuth()

    return (
        <header className={style.navbar}>
            <span className={style.title}>Todo</span>
            <nav>
                {
                    isSigned() ?
                        <button onClick={signOut}>Logout</button> :
                        <Link to="/login">Login</Link>
                }
            </nav>
        </header>
    )
}

export {
    Navbar
}