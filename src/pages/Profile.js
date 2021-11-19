import React, { useEffect, useState } from 'react'
import { logout } from '../firebase'
import { getAuth } from '@firebase/auth'
import MenuProfile from '../components/MenuProfile'
import db from '../firebase'
import { doc, getDoc } from '@firebase/firestore'
import { useHistory } from 'react-router-dom'

function Profile() {
  let history = useHistory()
  const auth = getAuth()
  const user = auth.currentUser

  const [currentUser, setCurrentUser] = useState()
  const [run, setRun] = useState(true)

  useEffect(() => {
    if (!user) {
      history.push('/')
    } else {
      const docRef = doc(db, 'users', user.uid)

      if (run) {
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data())
            setRun(false)
          }
        })
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user ? (user.uid, currentUser, run) : null])

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
                <MenuProfile admin={currentUser?.admin} />
              </div>
            </div>
          </div>

          <div className="col__right categorie">
            <h4 className="category_name">Hello {user?.displayName}</h4>
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
