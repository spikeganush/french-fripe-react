import {
  collection,
  doc,
  getDoc,
  query,
  updateDoc,
  onSnapshot,
  orderBy,
  arrayUnion,
  arrayRemove,
} from '@firebase/firestore'
import db from '../firebase'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Dropzone from '../components/Dropzone'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

import MenuAdmin from '../components/MenuAdmin'
import { Carousel } from 'react-responsive-carousel'

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
  const [productTrend, setProductTrend] = useState(false)
  const [productHomePage, setProductHomePage] = useState(false)
  const [productImage, setProductImage] = useState([])
  const [success, setSuccess] = useState('')

  const [imageList, setImageList] = useState([])
  const storage = getStorage()

  const changeImageField = (index, parameter, value) => {
    const newArray = [...imageList]
    newArray[index][parameter] = value
    setImageList(newArray)
  }

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
      productOnline !== '' &&
      productTrend !== '' &&
      productHomePage !== ''
    ) {
      await updateDoc(doc(db, 'products', id), {
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
        trend: productTrend,
        home_page: productHomePage,
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

  const handleDeleteImage = async (imageId) => {
    const docRef = doc(db, 'products', productId)
    await updateDoc(docRef, {
      images: arrayRemove(imageId),
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
        setProductCategory(products.categories_id)
        setProductPrice(products.price)
        setProductQuantity(products.quantity)
        setProductShortDescription(products.short_description)
        setProductFullDescription(products.full_description)
        setProductAverageTotalPiece(products.average_total_piece)
        setProductNumberBoxe(products.number_boxe)
        setProductWeight(products.weight)
        setProductImage(products.images)
        setProductOnline(products.online ? products.online : false)
        setProductTrend(products.trend ? products.trend : false)
        setProductHomePage(products.home_page ? products.home_page : false)
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
  }, [productId])

  useEffect(() => {
    imageList.forEach((image, index) => {
      if (image.status === 'FINISH' || image.status === 'UPLOADING') return
      changeImageField(index, 'status', 'UPLOADING')
      const fileName = `${image.file.lastModified}.${
        image.file.type === 'image/jpeg' ? 'jpg' : 'png'
      }`
      const storageRef = ref(storage, `images/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, image.file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              console.log('Upload is done')
              break
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log('Upload failed: ' + error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            changeImageField(index, 'downloadURL', downloadURL)
            changeImageField(index, 'status', 'FINISH')
            const addImageDb = async () => {
              const updateProduct = doc(db, 'products', productId)
              await updateDoc(updateProduct, {
                images: arrayUnion(downloadURL),
              })
            }
            addImageDb()
          })
        }
      )
    })
  })

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
                <div className="product__carousel">
                  <Carousel
                    autoPlay
                    infiniteLoop
                    interval={5000}
                    enableTouch
                    showThumbs={false}
                    showStatus={false}
                  >
                    {productImage?.map((image, index) => (
                      <div key={index}>
                        <img alt="product" src={image} />
                        <p
                          className="legend"
                          onClick={() => {
                            handleDeleteImage(image)
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </p>
                      </div>
                    ))}
                  </Carousel>
                </div>
                <Dropzone setImageList={setImageList} />
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
                      checked={productOnline ? productOnline : false}
                      readOnly
                    />

                    <div
                      className="online__fill"
                      onClick={() => setProductOnline(!productOnline)}
                    ></div>
                  </label>
                </div>
                <div className="trend">
                  Trend:
                  <label className="trend">
                    <input
                      type="checkbox"
                      className="online__trend"
                      checked={productTrend ? productTrend : false}
                      readOnly
                    />

                    <div
                      className="online__fill_trend"
                      onClick={() => setProductTrend(!productTrend)}
                    ></div>
                  </label>
                </div>
                <div className="home">
                  Home:
                  <label className="home">
                    <input
                      type="checkbox"
                      className="online__home"
                      checked={productHomePage ? productHomePage : false}
                      readOnly
                    />

                    <div
                      className="online__fill_home"
                      onClick={() => setProductHomePage(!productHomePage)}
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
