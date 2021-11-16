import { doc, getDoc, setDoc } from '@firebase/firestore'
import db from '../firebase'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import MenuAdmin from '../components/MenuAdmin'

function AdminEditProduct() {
  const [products, setProducts] = useState([])
  const { id } = useParams()
  const [productId, setProductId] = useState('')
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  const [productShortDescription, setProductShortDescription] = useState('')
  const [productFullDescription, setProductFullDescription] = useState('')
  const [productAverageTotalPiece, setProductAverageTotalPiece] = useState('')
  const [productNumberBoxe, setProductNumberBoxe] = useState('')
  const [productWeight, setProductWeight] = useState('')
  const [success, setSuccess] = useState('')

  const handleUpdate = async () => {
    await setDoc(doc(db, 'products', id), {
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      short_description: productShortDescription,
      full_description: productFullDescription,
      average_total_piece: productAverageTotalPiece,
      number_boxe: productNumberBoxe,
      weight: productWeight,
    }).then(() => {
      setSuccess('Update succeed')
      setTimeout(() => {
        setSuccess('')
      }, 3000)
    })
  }

  useEffect(() => {
    let cancel = false

    const getProduct = async () => {
      const product = await getDoc(doc(db, 'products', id))
      if (cancel) return
      else {
        setProducts(product.data())
        setProductId(product.id)
        setProductName(products.name)
        setProductPrice(products.price)
        setProductQuantity(products.quantity)
        setProductShortDescription(products.short_description)
        setProductFullDescription(products.full_description)
        setProductAverageTotalPiece(products.average_total_piece)
        setProductNumberBoxe(products.number_boxe)
        setProductWeight(products.weight)
      }
    }
    getProduct()

    return () => {
      cancel = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, productId])

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col__left">
            <div className="widget-wrapper">
              <h4>Admin menu:</h4>
              <br />
              <div className="list-group">
                <MenuAdmin />
              </div>
            </div>
          </div>

          <div className="col__right">
            <div className="product">
              <div className="product__left">
                <div className="product__carousel"></div>
              </div>

              <div className="product__text">
                {success && <span className="success-message">{success}</span>}
                Product name:
                <input
                  type="text"
                  value={productName ? productName : ''}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <h1 className="price">
                  AU$
                  <input
                    type="number"
                    className="price"
                    value={productPrice ? productPrice : ''}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </h1>
                <div className="quantity_container">
                  <h2>Quantity</h2>
                  <p>
                    <input
                      type="number"
                      value={productQuantity ? productQuantity : ''}
                      onChange={(e) => setProductQuantity(e.target.value)}
                    />
                    pieces in stock
                  </p>
                </div>
                <div className="full_description">
                  Full description:
                  <textarea
                    rows="10"
                    cols="50"
                    value={productFullDescription ? productFullDescription : ''}
                    onChange={(e) => setProductFullDescription(e.target.value)}
                  />
                </div>
                <div className="full_description">
                  Short description:
                  <textarea
                    rows="5"
                    cols="50"
                    value={
                      productShortDescription ? productShortDescription : ''
                    }
                    onChange={(e) => setProductShortDescription(e.target.value)}
                  />
                </div>
                <div className="full_description">
                  Average total pieces in this bundle:
                  <input
                    type="number"
                    value={
                      productAverageTotalPiece ? productAverageTotalPiece : ''
                    }
                    onChange={(e) =>
                      setProductAverageTotalPiece(e.target.value)
                    }
                  />
                </div>
                <div className="full_description">
                  Number of boxe (around 30Kg per boxe):
                  <input
                    type="number"
                    value={productNumberBoxe ? productNumberBoxe : ''}
                    onChange={(e) => setProductNumberBoxe(e.target.value)}
                  />
                </div>
                <div className="full_description">
                  Weight (in Kg):
                  <input
                    type="number"
                    value={productWeight ? productWeight : ''}
                    onChange={(e) => setProductWeight(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AdminEditProduct
