import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Users from './pages/Users'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Header>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </Header>
        </BrowserRouter>
    )
}

export default App
