import {createPost } from '../lib/actions'

import React from 'react'

const RoleForm = () => {
  return (
    <div>
      
    <form action={createPost}>
      <input type="text" name="title" />
      <input type="text" name="content" />
      <button type="submit">Create</button>
    </form>
    </div>
  )
}

export default RoleForm
