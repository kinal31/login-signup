import axios from 'axios'
import React, { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { TbLogout2 } from "react-icons/tb";

const UserProfile = () => {
    const [name ,setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token')
   
    useEffect(()=>{
        if (!token){
            navigate('/')
        }
    },)

    const handleUserProfile = async() =>{
        const response = await axios.post("http://localhost:4000/api/user-details",{name,email}, {
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `jwt ${localStorage.getItem('token')}`
              }
        })

        console.log(response);

        setName(response.data.data.name);
        setEmail(response.data.data.email);
        
    }

    useEffect(()=>{
        if(token){
            handleUserProfile()
        }
    },)

    const handleUserLogout = () =>{
        localStorage.clear()
        navigate('/')
    }

  return (
    <div className='container' style={{backgroundColor: "#D6D6D6", height : "100vh"}}>
        <div className='card-body p-5 text-center'>
        <div className='col-md-6 mx-auto my-md-2 pb-5 '>
            <h1 className='mb-5'>User Dashboard</h1>
           
           <marquee  direction="left">Welcome to Home Page</marquee>
            <table border={3} className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{name}</td>
                        <td>{email}</td>
                    </tr>
                </tbody>
            </table>
        </div>
            <button className="btn btn-primary btn-lg btn-rounded gradient-custom text-body px-5" type="submit" style={{backgroundColor : "#b0bccf"}} onClick={handleUserLogout}>
                <div><TbLogout2 /></div>Log out</button>
        </div>
    </div>
  )
}

export default UserProfile
