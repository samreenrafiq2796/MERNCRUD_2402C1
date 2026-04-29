import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export default function ForgetPassword() {
    let [ email ,  setEmail] = useState("")

    async function sendresetEmail(){
      try {
        if(!email){
            toast.error("Email is Required");
            return;
        }
        let res = await axios.
        post("http://localhost:5003/forgot",{
            email
        })
        toast.success(res.data.msg)
        setEmail("")
      } catch (error) {
        toast.error(error.response?.data.msg)
      }
    }
  return (
    <div className='container'>
    <ToastContainer/>

      <h1>Forget Password</h1>
      <p>Enter Your Registered Email</p>
      <input type="email" className="form-control my-3"
      placeholder='Email'
      onChange={(e)=>setEmail(e.target.value)}
      value={email} />

      <button className="btn btn-primary my-3" 
      onClick={sendresetEmail}>Send Reset Link</button>
    </div>
  )
}
