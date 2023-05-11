// AuthRoute.js
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from './useAuth'

export default function AuthRoute() {
    const { isLoggedIn } = useAuth()
    return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}
