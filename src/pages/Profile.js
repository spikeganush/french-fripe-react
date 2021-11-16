import React from 'react'
import { logout } from '../firebase'
import { getAuth } from '@firebase/auth'
import MenuProfile from '../components/MenuProfile'

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
    <main>
      <div className="container">
        <div className="row">
          <div className="col__left">
            <div className="widget-wrapper">
              <h4>Menu:</h4>
              <br />
              <div className="list-group">
                <MenuProfile admin={user.admin} />
              </div>
            </div>
          </div>

          <div className="col__right categorie">
            <h4 className="category_name">Hello {user.displayName}</h4>
            <hr className="extra-margins" />
            <div className="row">
              <button
                className="signout"
                onClick={() => {
                  handleLogout()
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile
