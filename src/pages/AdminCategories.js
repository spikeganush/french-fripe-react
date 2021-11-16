import {
  onSnapshot,
  collection,
  orderBy,
  query,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@firebase/firestore'
import db from '../firebase'
import React, { useState, useEffect } from 'react'
import MenuAdmin from '../components/MenuAdmin'

function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [newcategoryName, setNewCategoryName] = useState('')

  const handleUp = (id, position) => {
    categories.map((category) => {
      if (category.position === position - 1) {
        updateDoc(doc(db, 'categories', category.id), {
          position: category.position + 1,
        })
      }
      return null
    })

    updateDoc(doc(db, 'categories', id), {
      position: position - 1,
    })
  }

  const handleDown = (id, position) => {
    categories.map((category) => {
      if (category.position === position + 1) {
        updateDoc(doc(db, 'categories', category.id), {
          position: category.position - 1,
        })
      }
      return null
    })

    updateDoc(doc(db, 'categories', id), {
      position: position + 1,
    })
  }

  const handleOnline = (id, online) => {
    updateDoc(doc(db, 'categories', id), {
      online: !online,
    })
  }

  const handleAdd = async (e) => {
    e.preventDefault()

    await addDoc(collection(db, 'categories'), {
      name: newcategoryName,
      position: categories.length + 1,
      online: false,
    })
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'categories', id))
  }

  useEffect(() => {
    const q = query(collection(db, 'categories'), orderBy('position'))
    onSnapshot(q, (snapshot) => {
      setCategories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
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

          <div className="col__right">
            <h4 className="category_name">Admin categories </h4>
            <hr className="extra-margins" />
            <div className="row admin-category">
              {categories.map((category) => (
                <div className="list_categories" key={category.id}>
                  {category.position} {category.name}
                  <div className="arrow">
                    {category.position > 1 ? (
                      <button
                        className="arrow_button"
                        onClick={() => handleUp(category.id, category.position)}
                      >
                        ⇧
                      </button>
                    ) : null}

                    {category.position !== categories.length ? (
                      <button
                        className="arrow_button"
                        onClick={() =>
                          handleDown(category.id, category.position)
                        }
                      >
                        ⇩
                      </button>
                    ) : null}
                  </div>
                  <button
                    className="closing_button"
                    onClick={() => handleDelete(category.id)}
                  >
                    ❌
                  </button>
                  <label className="online" htmlFor={category.id}>
                    <input
                      type="checkbox"
                      id={category.id}
                      className="online__input"
                      checked={category.online}
                      readOnly
                    />

                    <div
                      className="online__fill"
                      onClick={() => handleOnline(category.id, category.online)}
                    ></div>
                  </label>
                </div>
              ))}
              <div className="add-category">
                <form onSubmit={handleAdd}>
                  <input
                    type="text"
                    placeholder="New category name"
                    value={newcategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <button type="submit">Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AdminCategories
