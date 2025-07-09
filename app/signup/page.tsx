import React from 'react'
import RoleForm from '../components/RoleForm'
import NavBar from '../components/NavBar'

const page = () => {
  return (
   <div className="w-full max-w-md border-2 border-double p-4 mb-12">
    <NavBar />
       <RoleForm />
     </div>
  )
}

export default page
