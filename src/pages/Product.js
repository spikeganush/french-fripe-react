import { doc, getDoc } from '@firebase/firestore'
import db from '../firebase'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MenuLeft from '../components/MenuLeft'

function Product() {
  const [products, setProducts] = useState([])
  const { id } = useParams()

  useEffect(() => {
    let cancel = false
    const getProduct = async () => {
      const product = await getDoc(doc(db, 'products', id))
      if (cancel) return
      else {
        setProducts(product.data())
      }
    }
    getProduct()
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

          <div className="col__right">
            <div className="product">
              <div className="product__left">
                <div className="product__carousel"></div>
              </div>
              <div className="product__text">
                <h1 className="product_name">{products.name}</h1>
                <h1 className="price">AU${products.price}</h1>

                <div className="quantity_container">
                  <h2>Quantity</h2>
                  <p>{products.quantity} remaining pieces</p>
                  <div className="quantity-select">
                    <button className="button minus">-</button>
                    <input
                      readOnly
                      type="number"
                      className="input"
                      value="1"
                      min="1"
                    />
                    <button className="button plus">+</button>
                  </div>
                  <div className="button pbtn">
                    <input type="hidden" value="1" name="quantity" />
                    <a
                      href="cart.php"
                      data-id="<?php echo $row_showProducts['id'];?>"
                      data-quantity="<?php echo $row_showProducts['minimum_quantity'];?>"
                      className="add-to-cart btn btn-default"
                    >
                      Add to card
                    </a>
                  </div>
                </div>

                <div className="full_description">
                  {products.full_description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Product
