import React from 'react'
import MenuAdmin from '../components/MenuAdmin'

function Admin() {
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
