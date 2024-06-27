import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import Navbar from '../components/Navbar';
import swal from 'sweetalert';

const Login = () => {

    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })

    const [login, setLogin] = useState(false)

    const handleChange = (e) => {
        const data = e.target.name
        const value = e.target.value
        setCredentials({ ...credentials, [data]: value })
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            })
        })

        const json = await response.json()

        if (!json.success) {
            swal({
                title: "Oops!",
                text: "Invalid Email or Password.",
                icon: "error",
                button: {
                    text: "Try Again!",
                    className: "alert-button",
                },
            });
        } else {
            setLogin(true)
            localStorage.setItem("login", login)
            navigate('/cards')
        }
    }

    return (
        <>
            <Navbar />
            <div className=''>
                <form onSubmit={handleSignUp}>
                    <div className="m-5">
                        <label htmlFor="email" className="text-xl bg-slate-100 p-2 m-5 rounded-md">Email :</label>
                        <input type="email" className="border-sky-500 border-2 rounded-sm" name="email" value={credentials.email} onChange={handleChange} autoComplete="off" />
                    </div>
                    <div className="m-5">
                        <label htmlFor="password" className="text-xl bg-slate-100 p-2 m-5 rounded-md">Password :</label>
                        <input type="password" className="border-sky-500 border-2 rounded-sm" name="password" value={credentials.password} onChange={handleChange} />
                    </div>
                    <div className='m-5'>
                        <button type="submit" className="bg-green-400 rounded-lg p-3 m-4 w-20 hover:bg-green-500 border-sky-100">LogIn</button>
                        <Link to='/signup' className=''>New User <ArrowCircleRightRoundedIcon /> SignUp Here!</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login