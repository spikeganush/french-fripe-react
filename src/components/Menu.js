import { onSnapshot, collection, orderBy, query } from '@firebase/firestore'
import db from '../firebase'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function Menu() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'categories'), orderBy('position'))
    onSnapshot(q, (snapshot) => {
      setCategories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }, [])

  return (
    <>
      {categories.map((category) => (
        <NavLink exact to={'/category/' + category.id} className="nav-link">
          {category.name}
        </NavLink>
      ))}
    </>
  )
}

export default Menu
