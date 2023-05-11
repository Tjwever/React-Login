import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../shared/AuthContext'
import '../App.css'

export default function Header(props) {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

    const handleLogout = async (e) => {
        e.preventDefault()

        authContext.logout()

        navigate('/login')
    }

    return (
        <>
            <div className='header'>
                <h1>Header</h1>
                <ul className='nav-links'>
                    <Link to={'/'}>
                        <li>Home</li>
                    </Link>
                    <Link to={'/users'}>
                        <li>Users</li>
                    </Link>
                </ul>

                <Link to={'/login'}>
                    <h4 onClick={handleLogout}>Logout</h4>
                </Link>
            </div>
            {props.children}
        </>
    )
}
