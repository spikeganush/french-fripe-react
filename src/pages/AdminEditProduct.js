import {
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  onSnapshot,
  orderBy,
} from '@firebase/firestore'
import db from '../firebase'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import MenuAdmin from '../components/MenuAdmin'

function AdminEditProduct() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const { id } = useParams()
  const [productId, setProductId] = useState('')
  const [productName, setProductName] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  const [productShortDescription, setProductShortDescription] = useState('')
  const [productFullDescription, setProductFullDescription] = useState('')
  const [productAverageTotalPiece, setProductAverageTotalPiece] = useState('')
  const [productNumberBoxe, setProductNumberBoxe] = useState('')
  const [productWeight, setProductWeight] = useState('')
  const [productOnline, setProductOnline] = useState(false)
  const [success, setSuccess] = useState('')

  const handleUpdate = async () => {
    if (
      productName &&
      productCategory &&
      productPrice &&
      productQuantity &&
      productShortDescription &&
      productFullDescription &&
      productAverageTotalPiece &&
      productNumberBoxe &&
      productWeight &&
      productOnline !== ''
    ) {
      await setDoc(doc(db, 'products', id), {
        name: productName,
        categories_id: productCategory,
        price: productPrice,
        quantity: productQuantity,
        short_description: productShortDescription,
        full_description: productFullDescription,
        average_total_piece: productAverageTotalPiece,
        number_boxe: productNumberBoxe,
        weight: productWeight,
        online: productOnline,
      }).then(() => {
        setSuccess('Update succeed')
        setTimeout(() => {
          setSuccess('')
        }, 3000)
      })
    } else {
      setSuccess('You need to fill every entry.')
      setTimeout(() => {
        setSuccess('')
      }, 3000)
    }
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
        setProductCategory(products.categories_id)
        setProductPrice(products.price)
        setProductQuantity(products.quantity)
        setProductShortDescription(products.short_description)
        setProductFullDescription(products.full_description)
        setProductAverageTotalPiece(products.average_total_piece)
        setProductNumberBoxe(products.number_boxe)
        setProductWeight(products.weight)
        setProductOnline(products.online)
      }
    }
    getProduct()

    const q = query(collection(db, 'categories'), orderBy('position'))
    onSnapshot(q, (snapshot) => {
      setCategories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

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
                Product name:
                <input
                  type="text"
                  value={productName ? productName : ''}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <div className="category_selector">
                  Category:
                  <select
                    value={productCategory ? productCategory : ''}
                    onChange={(e) => setProductCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
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
                  Weight (in Kg) per box:
                  <input
                    type="number"
                    value={productWeight ? productWeight : ''}
                    onChange={(e) => setProductWeight(e.target.value)}
                  />
                </div>
                <div className="online">
                  Online:
                  <label className="online">
                    <input
                      type="checkbox"
                      className="online__input"
                      checked={productOnline}
                      readOnly
                    />

                    <div
                      className="online__fill"
                      onClick={() => setProductOnline(!productOnline)}
                    ></div>
                  </label>
                </div>
                {success && <span className="success-message">{success}</span>}
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
