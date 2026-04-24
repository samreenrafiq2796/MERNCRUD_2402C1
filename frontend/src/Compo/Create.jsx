import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

export default function Create() {
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [pswd, setPswd] = useState("")
    let [age, setAge] = useState(0)
    let [marital, setMarital] = useState(true)

    async function save(){
       try {
        let username_regex = /^[a-zA-Z0-9_\s]{3,16}$/
        let email_regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        // Required
        if(!name || !email || !age || !marital){
          toast.error("All Fields Are Required")
          return
        }
        // Regex
        if(!name.match(username_regex)){
          toast.error("Username is Invalid")
          return
        }
        if(!email.match(email_regex)){
          toast.error("Useremail is Invalid")
          return
        }
        // Age
        if(age < 18){
          toast.error("User Age must be greater than 18")
          return
        }

        let response = await axios.post("http://localhost:5003/go",{
            name : name,
            email : email,
            age : age,
            Is_Married : marital,
            password : pswd
        })
        toast.success(response.data.msg)
       } catch (error) {
        if(error.response.status === 409){
          toast.error("Email Already Exist")
        }
        else{
          toast.error(error.response?.data.msg)
        }
       }
    }

  return (
    <div className='container'>
        <ToastContainer/>
        <h1>User Registration form</h1>
        <p>Enter Your Name</p>
        <input type="text" className="form-control my-3" onChange={(e)=>setName(e.target.value)}  value={name}/>

        <p>Enter Your Email</p>
        <input type="email" className="form-control my-3" onChange={(e)=>setEmail(e.target.value)} value={email}/>

        <p>Enter Your Password</p>
        <input type="password" className="form-control my-3" onChange={(e)=>setPswd(e.target.value)} value={pswd}/>

        <p>Enter Your Age</p>
        <input type="number" className="form-control my-3" onChange={(e)=>setAge(e.target.value)} value={age}/>

        <p>Select Marital Status</p>
        <select  className="form-select my-3"  onChange={(e)=>setMarital(e.target.value)}>
            <option value="true">Yes</option>
            <option value="false">No</option>
        </select>

        <button className="btn btn-primary my-3" onClick={save}>Save</button>
        <br />
        <Link to="/">Already have Account</Link>


    </div>
  )
}
