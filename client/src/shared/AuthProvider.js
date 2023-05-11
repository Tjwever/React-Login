import { useState, useEffect } from 'react'
import AuthContext from './AuthContext'

export default function AuthProvider(props) {
    const [users, setUsers] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const getCurrentUsers = async () => {
            try {
                const response = await fetch(
                    'http://localhost:4000/api/v1/user', { Authorization: 'Bearer ' + localStorage.getItem('jwt')}
                )

                if(response.ok) {
                    const data = response.json()
                    console.log(data)
                    setUsers(data)
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }

        const checkLoggedInStatus = async () => {
            try {
                console.log('auth mounted')
                const response = await fetch(
                    'http://localhost:4000/api/v1/auth/refresh',
                    {
                        credentials: 'include', // Include cookies in the request
                    }
                )

                console.log(response)

                if (response.ok) {
                    const data = await response.json()
                    // Store the new access token (JWT) in local storage or cookies
                    localStorage.setItem('jwt', data.requiredToken)
                    console.log('refresh token', data.requiredToken)
                    console.log('From Provider: ', isLoggedIn)
                    setIsLoggedIn(true)
                } else {
                    // Handle errors (e.g., no valid refresh token)
                    setIsLoggedIn(false)
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
        //uncomment when ready to link it up
        getCurrentUsers()
        checkLoggedInStatus()
    }, [])

    const login = async (email, password) => {
        // login actions
        try {
            const response = await fetch(
                'http://localhost:4000/api/v1/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            )

            if (
                response.ok &&
                email === 'wever@mail.com' &&
                password === 'password'
            ) {
                const data = await response.json()
                // Store JWT in local storage or cookies
                localStorage.setItem('jwt', data.token)
                setIsLoggedIn(true)
            } else {
                // Handle errors (e.g., invalid credentials)
                console.error('Failed to log in')
            }

            // setIsLoggedIn(true)
        } catch (error) {
            console.error('Failed to log in')
        }
    }

    const logout = async () => {
        try {
            const response = await fetch(
                'http://localhost:4000/api/v1/auth/logout',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer \${localStorage.getItem('jwt')}`,
                    },
                }
            )

            if (response.ok) {
                // Remove JWT from local storage or cookies
                localStorage.removeItem('jwt')
                setIsLoggedIn(false)
            } else {
                // Handle errors (e.g., failed to log out)
                console.error('Failed to log out')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const contextValue = {
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}
