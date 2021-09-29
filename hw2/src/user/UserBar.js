import React from 'react'

import Logout from './Logout'
import Register from './Register'
import Login from './Login'

export default function UserBar() {
  
  const user = ''

  if (user) {
      return <Logout user={user} />
  } else {
      return (
          <>
            <Login />
            <Register />
          </>
      )
  }
}
