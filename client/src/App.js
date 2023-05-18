import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Users from './pages/Users'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import AuthProvider from './shared/AuthProvider'
import AuthRoute from './shared/AuthRoute'
import './App.css'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Header>
                    <Routes>
                        <Route path='/' element={<AuthRoute />}>
                            <Route index element={<Home />} />
                        </Route>
                        <Route path='/users' element={<AuthRoute />}>
                            <Route index element={<Users />} />
                        </Route>
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                    </Routes>
                </Header>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
