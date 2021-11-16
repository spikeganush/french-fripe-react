import React from 'react'
import { NavLink } from 'react-router-dom'

function MenuAdmin() {
  return (
    <>
      <NavLink exact to={'/admin/categories'} className="list-group-item">
        Categories
      </NavLink>
      <NavLink exact to={'/admin/products'} className="list-group-item">
        Products
      </NavLink>
    </>
  )
}

export default MenuAdmin
