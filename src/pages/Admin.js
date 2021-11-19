import React, { useEffect } from 'react'
import MenuAdmin from '../components/MenuAdmin'
import { useHistory } from 'react-router-dom'

//firebase
import { getAuth } from '@firebase/auth'

function Admin({ props }) {
  let history = useHistory()
  const auth = getAuth()
  const user = auth.currentUser

  useEffect(() => {
    if (!user) {
      history.push('/')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col__left">
            <div className="widget-wrapper">
              <h4>Menu Admin:</h4>
              <br />
              <div className="list-group">
                <MenuAdmin />
              </div>
            </div>
          </div>

          <div className="col__right categorie">
            <h4 className="category_name">Hello </h4>
            <hr className="extra-margins" />
            <div className="row"></div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Admin
