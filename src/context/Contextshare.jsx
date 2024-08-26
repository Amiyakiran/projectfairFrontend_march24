import React, { useState } from 'react'
import { createContext } from 'react'


export const addResponseContext = createContext({})
export const editResponseContext = createContext({})
export const isLoginAuthContext = createContext(false)


function Contextshare({children}) {
    //children - is predefined props to share data

    const [addResponse , setAddResponse] = useState({})
    const [editResponse , setEditResponse] = useState({})
    const [isLoginStatus , setIsLoginStatus] = useState(false)

    
  return (
    <addResponseContext.Provider value={{addResponse , setAddResponse}}> {/* provider tag to share that data - where shared data should placed inside the value attribute as key:value pairs */}
      <editResponseContext.Provider value={{editResponse , setEditResponse}}>  
       <isLoginAuthContext.Provider value={{isLoginStatus , setIsLoginStatus}}> 
        {children}
        </isLoginAuthContext.Provider>
      </editResponseContext.Provider>
    </addResponseContext.Provider>
  )
}

export default Contextshare