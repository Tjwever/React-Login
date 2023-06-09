// useAuth.js
import { useContext } from 'react'
import AuthContext from './AuthContext'

export default function useAuth() {
    const authContext = useContext(AuthContext)
    return authContext
}
