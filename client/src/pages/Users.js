import { useContext } from 'react'
import AuthContext from '../shared/AuthContext'

export default function Users() {
    const authContext = useContext(AuthContext)
    const token = localStorage.getItem('jwt')

    console.log('From Home: ', authContext.isLoggedIn)

    return (
        <div className='App'>
            {authContext.isLoggedIn && token ? (
                <h1>Users</h1>
            ) : (
                <h1>Access Denied...</h1>
            )}
        </div>
    )
}
