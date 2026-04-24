import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

export default function Login() {
    let [email, setEmail] = useState("")
    let [pswd, setPswd] = useState("")
    let chalo = useNavigate()
    async function login_func(){
        try {
            if(!email || !pswd){
                toast.error("All Fields are Required")
                return
            }
            let res = await axios.post("http://localhost:5003/log",{
                email : email,
                password : pswd
            })
            toast.success(res.data.msg)
            chalo("/show")

        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div className='container'>
        <ToastContainer/>
        <h1>Login Your Account</h1>
        <p>Enter Your Email</p>
        <input type="email" className="form-control my-3" onChange={(e)=>setEmail(e.target.value)} value={email}/>

        <p>Enter Your Password</p>
        <input type="password" className="form-control my-3" onChange={(e)=>setPswd(e.target.value)} value={pswd}/>

        <button className="btn btn-primary my-3" onClick={login_func}>Login</button>
        <br />
        <Link to="/cr">Create Your Account</Link>

    </div>
  )
}
