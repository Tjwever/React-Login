import AuthContext from '../shared/AuthContext'
import { useState } from 'react'

export default function Register() {

    const [] = useState()
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            
        }

        try {
            const response = await fetch(
                'http://localhost:4000/api/v1/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(),
                }
            )

            // setIsLoggedIn(true)
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
                    <input id='first-name' type='text' />
                </div>
                <div>
                    <label htmlFor='last-name'>Last Name: </label>
                    <input id='last-name' type='text' />
                </div>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input id='email' type='email' />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input id='password' type='text' />
                </div>

                <button onClick={handleSubmit}>Sign Up!</button>
            </form>
        </div>
    )
}
