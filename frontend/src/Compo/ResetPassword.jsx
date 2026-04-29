import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


export default function ResetPassword() {
    let [ pswd ,  setPswd] = useState("")
    let [ cpswd ,  setCPswd] = useState("")

    async function reset(){
        if (pswd !== cpswd) {
            toast.error("Password Must Match")
            return
        }
    }

  return (
    <div>
      <div className='container'>
    <ToastContainer/>

      <h1>Reset Password</h1>

      <p>Enter Your New Password</p>
      <input type="password" className="form-control my-3"
      placeholder='Password'
      onChange={(e)=>setPswd(e.target.value)}
      value={pswd} />

       <p>Confirm Password</p>
      <input type="password" className="form-control my-3"
      placeholder='Password'
      onChange={(e)=>setCPswd(e.target.value)}
      value={cpswd} />

      <button className="btn btn-primary my-3" onClick={reset}>Change Password</button>
    </div>
    </div>
  )
}
