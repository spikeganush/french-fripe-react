import React, { useEffect, useState } from 'react'
import MenuAdmin from '../components/MenuAdmin'
import { collection, onSnapshot, query } from '@firebase/firestore'
import db from '../firebase'
import { NavLink } from 'react-router-dom'

function AdminProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'products'))
    onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
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

          <div className="col__right categorie">
            <h4 className="category_name">Admin Products </h4>
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
                          to={'../admin/product/' + product.id}
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

export default AdminProducts
