import { useContext } from 'react'
import AuthContext from '../shared/AuthContext'
import styles from '../style/Home.module.css'

export default function Home() {
    const authContext = useContext(AuthContext)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const token = localStorage.getItem('jwt')

    console.log('Home.js: ', authContext.isLoggedIn && token && isLoggedIn)

    return (
        <div className={styles.main}>
            {token && isLoggedIn ? <h1>Home</h1> : <h1>Access Denied...</h1>}
        </div>
    )
}
