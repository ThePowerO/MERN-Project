import React from 'react'
import { useState } from 'react';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import ImageL from './assets/img/Site-logo.png';
import ImageBG from './assets/img/BF-BG.png';
import './Login.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const loginUser = async (e) => {
        e.preventDefault()

        const {email, password} = data
        try {
            const {data} = await axios.post('/login', {
                email,
                password
            })

            if(data.error) {
                toast.error(data.error)
            } else {
                setData({})
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <img className='image-bf' src={ImageBG} />
        <div className='container'>
            <div className='container-box'>
                <form onSubmit={loginUser} className='form'>
                    <img className='logo-site' src={ImageL} />
                    <h1>Login</h1>
                    <div className='input-box'>
                        <span className='icon'><i className="bi bi-envelope"></i></span>
                        <input type="email" name='email' placeholder='Email'
                        value={data.email} onChange={(e) => setData({...data, email: e.target.value})}
                        />
                    </div>
                    <div className='input-box'>
                        <span className='icon'><i className="bi bi-key"></i></span>
                        <input type="password" name='password' placeholder='Password'
                        value={data.password} onChange={(e) => setData({...data, password: e.target.value})}
                        />
                    </div>
                    <div id='settings-create' className="d-flex justify-content-between align-items-center">
                        <div>
                            <input
                                type='checkbox'
                                name='rememberme'
                                className='remember-me'
                            />
                            <span className='remember-me-span'>
                                Remember me
                            </span>
                        </div>
                        <Link to='/register'> - Don't have an account?</Link>
                    </div>
                    <button className='btn btn-primary'>Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}
