import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isLoginAuthContext } from '../context/Contextshare';



function Header() {
  const navigate = useNavigate()
  const [token, setToken] = useState("")
  const {setIsLoginStatus} = useContext(isLoginAuthContext)

  const logout = ()=>{
      sessionStorage.removeItem("existingUser")
      sessionStorage.removeItem("token")
      setIsLoginStatus(false)
      navigate('/')
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  return (
    <Navbar className="bg-success">
    <Container>
      <Navbar.Brand className='text-light'>
       <Link to={'/'} className='text-light' style={{textDecoration:'none'}}> <h4><FontAwesomeIcon icon={faStackOverflow} className='fa-2x' />Project Fair</h4></Link>
      </Navbar.Brand>

     {token && <button onClick={logout} className='btn btn-warning rounded-0'><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>}
    </Container>
  </Navbar>
  )
}

export default Header