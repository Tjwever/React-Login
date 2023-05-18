import { useContext } from 'react'
import AuthContext from '../shared/AuthContext'

export default function Home() {
    const authContext = useContext(AuthContext)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const token = localStorage.getItem('jwt')

    console.log('Home.js: ', authContext.isLoggedIn && token && isLoggedIn)

    return (
        <div className='App'>
            {token && isLoggedIn ? <h1>Home</h1> : <h1>Access Denied...</h1>}
        </div>
    )
}
