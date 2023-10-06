import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import Register from './Register'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App;
