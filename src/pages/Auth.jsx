import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isLoginAuthContext } from '../context/Contextshare'



function Auth({ register }) {
  const navigate = useNavigate()
  const {setIsLoginStatus} = useContext(isLoginAuthContext)

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleRegister = async (e) => {
    e.preventDefault()
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info('please fill the fields completely')
    }
    else {
      const result = await registerApi(userDetails)
      console.log(result);
      if (result.status == 200) {
        toast.success('Registration successfull')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else {
        toast.error('something went wrong')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }

  }

  console.log(userDetails);

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = userDetails

    if (!email || !password) {
      toast.info('Please fill form completely')
    }
    else {
      const result = await loginApi({ email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success('Login successfull')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)
        setIsLoginStatus(true)
        navigate('/')
      }
      else{
        toast.error('Something went wrong')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }

    }
  }


 


  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="container w-75">
        <h4><Link to={'/'} className='text-warning' style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faArrowLeft} className="me-2" />Back Home</Link></h4>
        <div className='bg-success p-3'>
          <Row>
            <Col md={6} className='p-4 d-flex justify-content-center align-items-center'>
              <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="no image" width={'70%'} />
            </Col>
            <Col md={6} className='p-5 d-flex justify-content-center text-light'>
              <form className='w-100'>
                <h4 className='text-center text-light'><FontAwesomeIcon icon={faStackOverflow} className='fa-2x' />Project Fair</h4>
                {register ? <h5 className='text-center mb-4'>Sign Up to Your Account</h5> :
                  <h5 className='text-center mb-4'>Sign In to Your Account</h5>}

                {register && <div className="mb-3">
                  <input type="text" placeholder='Username' className='form-control rounded-0' value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />
                </div>}
                <div className="mb-3">
                  <input type="text" placeholder='Email ID' className='form-control rounded-0' value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='Password' className='form-control rounded-0' value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />
                </div>
                <div className="mb-3">
                  {register ? <div>
                    <button type='button' className='btn btn-warning w-100 rounded-0' onClick={handleRegister}>Register</button>
                    <p className='mt-3'>Already a User? click Here to <Link to={'/login'} className='text-danger'>Login</Link></p>
                  </div>
                    :
                    <div> <button type='button' onClick={handleLogin} className='btn btn-warning w-100 rounded-0'>Login</button>
                      <p className='mt-3'>New User? click Here to<Link to={'/register'} className='text-danger'> Register</Link></p>
                    </div>}
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </div>
      <ToastContainer autoClose={2000} theme="colored" position='top-center' />
    </div>
  )
}

export default Auth