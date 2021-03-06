import {
  onSnapshot,
  collection,
  orderBy,
  query,
  where,
} from '@firebase/firestore'
import db from '../firebase'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function MenuLeft() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const q = query(
      collection(db, 'categories'),
      where('online', '==', true),
      orderBy('position')
    )
    onSnapshot(q, (snapshot) => {
      setCategories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }, [])

  return (
    <>
      {categories.map((category) => (
        <NavLink
          exact
          to={'/category/' + category.id}
          className="list-group-item"
          key={category.id}
        >
          {category.name}
        </NavLink>
      ))}
    </>
  )
}

export default MenuLeft
