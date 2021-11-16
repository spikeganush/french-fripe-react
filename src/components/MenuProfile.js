import React from 'react'
import { NavLink } from 'react-router-dom'

function MenuProfile(props) {
  return (
    <>
      <NavLink exact to={'/previous-order'} className="list-group-item">
        Previous order
      </NavLink>
      <NavLink exact to={'/settings'} className="list-group-item">
        Settings
      </NavLink>
      {props.admin ? (
        <NavLink exact to={'/admin/'} className="list-group-item">
          Admin
        </NavLink>
      ) : null}
    </>
  )
}

export default MenuProfile
