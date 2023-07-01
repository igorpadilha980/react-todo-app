import Navbar from '../Navbar'

import style from './PageLayout.module.css'

function PageLayout({ children }) {
    return (
        <div className={style.layout}>
            <Navbar />
            { children }
        </div>
    )
}

export default PageLayout