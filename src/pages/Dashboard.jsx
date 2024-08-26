import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'

function Dashboard() {

  const [username , setUsername] = useState("")

  useEffect(()=>{
      if(sessionStorage.getItem("existingUser")){
        setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
      }
  },[])


  
  
  return (
    <>
    <Header/>
      <div className="container-fluid">
        <h3 className='my-4 ms-3'>Welcome <span className='text-warning'>{username}</span></h3>
        <div className="row mt-5">
          <div className="col-md-8 px-md-5">
            <Myproject/>
          </div>
          <div className="col-md-4 px-md-5">
            <Profile/>
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard