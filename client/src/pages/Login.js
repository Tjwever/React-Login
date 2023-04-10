import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className='App'>
            <h1>Login</h1>
            <Link to={'/register'}>Register</Link>
        </div>
    )
}
