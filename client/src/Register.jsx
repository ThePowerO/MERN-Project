import React from 'react'
import { useState } from 'react';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import ImageL from './assets/img/Site-logo.png';
import ImageBG from './assets/img/BF-BG.png';
import './Register.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {

    const navigate = useNavigate();
    const [data, setData] = useState({
        nickname: '',
        email: '',
        password: '',
    })

    const registerUser = async (e) => {
        e.preventDefault()

        const {nickname, email, password} = data
        try {
            const {data} = await axios.post('/register', {
                nickname, email, password
            })

            if(data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Login Successful')
                navigate('/login')
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
                    <form onSubmit={registerUser} className='form'>
                    <img className='logo-site' src={ImageL} />
                    <h1>Register</h1>
                    <div className='input-box'>
                        <span className='icon'><i className="bi bi-person"></i></span>
                        <input type="text" name='nickname' placeholder='Nickname'
                        value={data.nickname} onChange={(e) => setData({...data, nickname: e.target.value})}
                        />
                    </div>
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
                        <Link to='/login'>Already Have an account?</Link>
                    </div>
                    <button className='btn btn-primary'>Create</button>
                </form>
            </div>
        </div>
    </div>
  )
}
