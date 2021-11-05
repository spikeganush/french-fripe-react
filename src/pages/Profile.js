import React from 'react'
import { logout } from '../firebase'
import { getAuth } from '@firebase/auth'

function Profile({ history }) {
  const auth = getAuth()
  const user = auth.currentUser
  const handleLogout = async () => {
    try {
      await logout()
      history.push('/')
    } catch {
      alert('Logout failed')
    }
  }
  return (
    <>
      <div>{user.displayName}</div>
      <button
        className="signout"
        onClick={() => {
          handleLogout()
        }}
      >
        Sign out
      </button>
    </>
  )
}

export default Profile
