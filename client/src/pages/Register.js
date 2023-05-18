import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
        }

        console.log(formData)

        try {
            const response = await fetch(
                'http://localhost:4000/api/v1/user/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            )

            if (!response.ok) {
                console.log('Registration failed!')
            }

            navigate('/login')
        } catch (error) {
            console.error('Failed to log in')
        }
    }

    return (
        <div className='App'>
            <h1>Register</h1>

            <form>
                <div>
                    <label htmlFor='first-name'>First Name: </label>
                    <input
                        id='first-name'
                        type='text'
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <label htmlFor='last-name'>Last Name: </label>
                    <input
                        id='last-name'
                        type='text'
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input
                        id='email'
                        type='email'
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input
                        id='password'
                        type='password'
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>

                <button onClick={handleSubmit}>Sign Up!</button>
            </form>

            <Link to={'/login'}>Back to Login</Link>
        </div>
    )
}
