import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

//components
import Header from '../Header'
import Footer from '../Footer'
//pages
import Home from '../../pages/Home'
import AboutUs from '../../pages/AboutUs'
import Category from '../../pages/Category'
import Shop from '../../pages/Shop'
import Terms from '../../pages/Terms'
import Trends from '../../pages/Trends'

const index = () => {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/shop" exact component={Shop} />
      <Route path="/about-us" exact component={AboutUs} />
      <Route path="/category" exact component={Category} />
      <Route path="/terms" exact component={Terms} />
      <Route path="/trends" exact component={Trends} />
      <Switch>
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  )
}

export default index
