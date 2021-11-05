import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Log from './auth'

import logo from '../img/french_fripe_logo.png'
import Menu from './Menu'

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loginPopup, setLoginPopup] = useState(false)

  return (
    <>
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
                  <NavLink
                    exact
                    to="/"
                    className="nav-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to="/shop"
                    className="nav-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    Shop
                  </NavLink>
                </li>
                <div className="link-phone">
                  <Menu click={setMobileOpen} />
                </div>
                <li>
                  <NavLink
                    exact
                    to="/about-us"
                    className="nav-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    About us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to="/terms"
                    className="nav-link"
                    onClick={() => setMobileOpen(false)}
                  >
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
            <div
              className={mobileOpen ? 'stripe top open' : 'stripe top'}
            ></div>
            <div
              className={mobileOpen ? 'stripe mid open' : 'stripe mid'}
            ></div>
            <div
              className={mobileOpen ? 'stripe down open' : 'stripe down'}
            ></div>
          </button>
        </nav>
        <section className="shop">
          <div className="shop_icon">
            <i className="fas fa-shopping-cart"></i>{' '}
            <i className="fas fa-user" onClick={() => setLoginPopup(true)}></i>
          </div>
        </section>
      </header>

      {loginPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <span className="cross" onClick={() => setLoginPopup(false)}>
              &#10005;
            </span>
            <div className="log-container">
              <Log signin={true} signup={false} forgot={false} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
