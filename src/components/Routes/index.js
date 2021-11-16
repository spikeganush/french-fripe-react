import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//components
import Header from '../Header'
import Footer from '../Footer'
//pages
import Home from '../../pages/Home'
import AboutUs from '../../pages/AboutUs'
import Category from '../../pages/Category'
import Product from '../../pages/Product'
import Shop from '../../pages/Shop'
import Terms from '../../pages/Terms'
import Trends from '../../pages/Trends'
import Profile from '../../pages/Profile'
import Admin from '../../pages/Admin'
import AdminProducts from '../../pages/AdminProducts'
import AdminCategories from '../../pages/AdminCategories'
import AdminEditProduct from '../../pages/AdminEditProduct'

const index = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/about-us" exact component={AboutUs} />
        <Route path="/category/:id" exact component={Category} />
        <Route path="/product/:id" exact component={Product} />
        <Route path="/terms" exact component={Terms} />
        <Route path="/trends" exact component={Trends} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/admin/" exact component={Admin} />
        <Route path="/admin/products" exact component={AdminProducts} />
        <Route path="/admin/product/:id" exact component={AdminEditProduct} />
        <Route path="/admin/categories" exact component={AdminCategories} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default index
