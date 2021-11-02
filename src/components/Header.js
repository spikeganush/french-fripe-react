import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../img/french_fripe_logo.png'

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header>
      <nav className="navbar navbar-dark">
        <div className="left_nav">
          <NavLink exact to="/" className="navbar-brand">
            <img src={logo} alt="logo" />
          </NavLink>
          <div
            className={
              mobileOpen
                ? 'collapse navbar-collapse open'
                : 'collapse navbar-collapse'
            }
          >
            <ul className="navbar-nav">
              <li>
                <NavLink exact to="/shop" className="nav-link">
                  Shop
                </NavLink>
              </li>
              <div className="link-phone">
                <NavLink exact to="/trends" className="nav-link">
                  Trends
                </NavLink>
                <NavLink exact to="/category" className="nav-link">
                  Category
                </NavLink>
              </div>
              <li>
                <NavLink exact to="/about-us" className="nav-link">
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/terms" className="nav-link">
                  Terms and conditions
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="top-text">
          Second hand vintage Wholesal
          <span className="login_hide">e</span>
        </div>
        <button
          className="nav-button"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className={mobileOpen ? 'stripe top open' : 'stripe top'}></div>
          <div className={mobileOpen ? 'stripe mid open' : 'stripe mid'}></div>
          <div
            className={mobileOpen ? 'stripe down open' : 'stripe down'}
          ></div>
        </button>
      </nav>
    </header>
  )
}

export default Header
