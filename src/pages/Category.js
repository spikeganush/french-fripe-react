import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  getDoc,
} from '@firebase/firestore'
import db from '../firebase'
import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import MenuLeft from '../components/MenuLeft'

function Category() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const { id } = useParams()

  useEffect(() => {
    let cancel = false
    const getCategory = async () => {
      const category = await getDoc(doc(db, 'categories', id))
      if (cancel) return
      else {
        setCategories(category.data())
      }
    }
    getCategory()

    const q2 = query(
      collection(db, 'products'),
      where('categories_id', '==', id),
      where('online', '==', true)
    )

    onSnapshot(q2, (snapshot2) => {
      setProducts(snapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    return () => {
      cancel = true
    }
  }, [id])

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col__left">
            <div className="widget-wrapper">
              <h4>Categories:</h4>
              <br />
              <div className="list-group">
                <MenuLeft />
              </div>
            </div>
          </div>

          <div className="col__right categorie">
            <h4 className="category_name">{categories.name}</h4>
            <hr className="extra-margins" />
            <div className="row">
              {products.map((product) => (
                <div className="col-lg-4 categorie" key={product.id}>
                  <div className="card">
                    <div className="front">
                      <div className="card__photo">
                        <img
                          src={product.images ? product.images[0] : ''}
                          className="img-fluid"
                          alt="product"
                        />
                        {/* <a href="#">
                          <div className="mask"></div>
                        </a> */}
                      </div>

                      <div className="card-block">
                        <h4 className="card-title">{product.name}</h4>

                        <p className="card-text">AU${product.price}</p>
                      </div>
                    </div>
                    <div className="back">
                      <h4 className="card-title">{product.name}</h4>
                      <h4 className="card-title">
                        <strong>AU${product.price}</strong>
                      </h4>

                      <div className="card-text">
                        <p>{product.short_description}</p>
                      </div>
                      <div className="button">
                        <NavLink
                          exact
                          to={'../product/' + product.id}
                          className="btn btn-default"
                        >
                          More info
                        </NavLink>
                      </div>
                    </div>
                    <div className="background"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Category
