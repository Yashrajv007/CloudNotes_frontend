import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Login = (props) => {
    const {mode}=props;
    const [credentials,setCredentials] =useState({email:"",password:""})
    const navigate = useNavigate()

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch(`https://cloud-notes-backend-nine.vercel.app/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
              
            },
            body: JSON.stringify({ email:credentials.email,password:credentials.password })
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
            // redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Login Successful","success");
            navigate("/home");
          }
          else{
            props.showAlert("invalid details","danger");
          }
    }

    const handlechange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container-fluid shadow p-3 rounded  mt-3" style={{width:"600px",backgroundColor:mode==='light'?'white':'#212529'}}>
            <h2 className='mt-3' style={{color:props.mode==='light'?'black':'white'}}>Login to continue to CloudNotes</h2>
            <form onSubmit={handleSubmit} className='mb-3'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" style={{color:props.mode==='light'?'black':'white'}}>Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name='email' onChange={handlechange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text" style={{color:props.mode==='light'?'black':'white'}}>We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" style={{color:props.mode==='light'?'black':'white'}}>Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={handlechange}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
