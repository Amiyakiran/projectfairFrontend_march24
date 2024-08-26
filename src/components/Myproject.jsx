import React, { useContext, useEffect, useState } from 'react'
import AddProject from '../components/AddProject'
import EditProject from './EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { removeUserProjectApi, userProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editResponseContext } from '../context/Contextshare'


function Myproject() {

  const {addResponse} = useContext(addResponseContext)
  const [deleteStatus , setDeleteStatus] = useState(false)
  const [userProject, setUserProject] = useState([])
  const {editResponse} = useContext(editResponseContext)

  const getuserProject  = async()=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    const result = await userProjectApi(reqHeader)
    setUserProject(result.data);
    
  }
console.log(userProject);

const handleDelete = async(id)=>{
 const result=  await removeUserProjectApi(id)
 if(result.status ==200){
  setDeleteStatus(true)
 }
   
}
useEffect(()=>{
  getuserProject()
  setDeleteStatus(false)
},[addResponse,deleteStatus, editResponse])

  return (
    <>
    <div className="shadow p-md-5 p-3 mb-5">
      <div className='d-flex mt-4'>
          <h4 className='text-success me-auto'>My Project</h4>
          <AddProject/>
      </div>
      

     {userProject?.length>0? 
     userProject?.map((item)=>(
      <div className='p-3 mt-4 rounded-2 d-flex' style={{backgroundColor:'lightgray'}}>
        <h5>{item.title}</h5>
        <div className="d-flex ms-auto align-items-center">
          <EditProject project={item} />
         <Link to={item?.website} target='_blank'> <FontAwesomeIcon icon={faGlobe} className='ms-3 text-warning' /></Link>
         <Link to={item?.github} target='_blank'> <FontAwesomeIcon icon={faGithub} className='ms-3 text-success' /></Link>
          <FontAwesomeIcon onClick={()=>handleDelete(item._id)} icon={faTrash} className='ms-3 text-danger' />
        </div>
      </div>
     ))
      :
      <p className='text-danger'>No Project Yet Added</p>
    }

    </div>
      
    </>
  )
}

export default Myproject