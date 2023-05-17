import { useContext } from 'react'
import AuthContext from '../shared/AuthContext'

export default function Users() {
    const authContext = useContext(AuthContext)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const token = localStorage.getItem('jwt')

    console.log('From Users: ', authContext.isLoggedIn && token && isLoggedIn)

    return (
        <div className='App'>
            {token && isLoggedIn ? <h1>Users</h1> : <h1>Access Denied...</h1>}
        </div>
    )
}
