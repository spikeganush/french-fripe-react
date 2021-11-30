import { onSnapshot, collection, query, where } from '@firebase/firestore'
import db from '../firebase'

import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import CarouselTrend from '../components/CarouselTrend'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import MenuLeft from '../components/MenuLeft'

function Shop() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    let cancel = false
    if (cancel) return
    else {
      const q2 = query(collection(db, 'products'), where('trend', '==', true))

      onSnapshot(q2, (snapshot) => {
        setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    }

    return () => {
      cancel = true
    }
  }, [])
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
          <div className="col__right">
            <div className="whatsnew">
              <div className="divider-new">
                <h2 className="h2-responsive">What's new?</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <CarouselTrend />
              </div>
            </div>

            <hr className="extra-margins" />

            <div className="row double">
              {products.map((product) => (
                <div className="col-lg-4">
                  <div className="card">
                    <div className="front">
                      <div className="card__photo">
                        <img
                          src={product ? product.images[0] : ''}
                          className="img-fluid"
                          alt=""
                        />
                      </div>

                      <div className="card-block">
                        <h4 className="card-title">{product.name}</h4>

                        <p>AU${product.price}</p>
                      </div>
                    </div>
                    <div className="back">
                      <h4 className="card-title">
                        {product.name} <strong>AU${product.price}</strong>
                      </h4>

                      <div className="card-text">
                        {product.short_description}
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

export default Shop
