import { useState, useEffect } from 'react'
import AuthContext from './AuthContext'

export default function AuthProvider(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true')

    console.log('authProvider.js: ', isLoggedIn)
    
    useEffect(() => {
        const checkLoggedInStatus = async () => {
            try {
                const response = await fetch(
                    'http://localhost:4000/api/v1/auth/refresh',
                    {
                        credentials: 'include', // Include cookies in the request
                    }
                )

                if (response.ok) {
                    const data = await response.json()
                    // Store the new access token (JWT) in local storage or cookies
                    localStorage.setItem('jwt', data.requiredToken)
                    console.log('refresh token', data.requiredToken)
                    console.log('From Provider: ', isLoggedIn)
                    setIsLoggedIn(true)
                } else {
                    // Handle errors (e.g., no valid refresh token)
                    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
        //uncomment when ready to link it up
        // getCurrentUsers()
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

            if (response.ok) {
                const data = await response.json()
                // Store JWT in local storage or cookies
                localStorage.setItem('jwt', data.token)
                localStorage.setItem('isLoggedIn', 'true')
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
                localStorage.removeItem('isLoggedIn')
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
