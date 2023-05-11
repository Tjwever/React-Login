import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../shared/AuthContext'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const authContext = useContext(AuthContext)
    const [loggedIn, setLoggedIn] = useState(authContext.isLoggedIn)

    const navigate = useNavigate()

    useEffect(() => {
        if(authContext.isLoggedIn) {
            navigate('/')
        }
    }, [authContext.isLoggedIn])

    const handleSubmit = async (e) => {
        e.preventDefault()

        authContext.login(email, password)
        // console.log('Is Logged in: ', authContext.isLoggedIn)

        // setLoggedIn(true)
        // navigate('/')
    }

    return (
        <div className='App'>
            <h1>Login</h1>

            <form>
                <div>
                    <label>Email</label>
                    <input
                        type='email'
                        name='email'
                        autoComplete='off'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        autoComplete='off'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button onClick={handleSubmit}>Login!</button>
            </form>

            <Link to={'/register'}>Register</Link>
        </div>
    )
}
