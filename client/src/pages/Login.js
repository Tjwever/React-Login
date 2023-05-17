import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../shared/AuthContext'
import styles from '../style/Login.module.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (authContext.isLoggedIn) {
            navigate('/')
        }
    }, [authContext.isLoggedIn])

    const handleSubmit = async (e) => {
        e.preventDefault()

        authContext.login(email, password)
    }

    return (
            <div className={styles.cardContainer}>
                <div className={styles.formContainer}>
                    <h1>Welcome Back!</h1>
                    <form>
                        <div className={styles.flexy}>
                            <label>Email</label>
                            <input
                                type='email'
                                name='email'
                                autoComplete='off'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.flexy}>
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
                    <div>
                        Not a memeber? <Link to={'/register'}>Sign up!</Link>
                    </div>
                </div>
            </div>
    )
}
