import { Link } from 'react-router-dom'
import '../App.css'

export default function Header(props) {
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
                    <Link to={'/posts'}>
                        <li>Posts</li>
                    </Link>
                </ul>

                    <Link to={'/login'}>
                        <h4>Logout</h4>
                    </Link>
            </div>
            {props.children}
        </>
    )
}
