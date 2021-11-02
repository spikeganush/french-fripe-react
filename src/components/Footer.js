import React from 'react'
// import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer className="page-footer center-on-small-only">
      <div className="container-fluid">
        <div className="row footer">
          <div className="col-lg-2 col-md-4 hidden-lg-down">
            <h5>French fripe</h5>
            <p>It's about recycling and have a sustainable approach....</p>
          </div>

          <div className="col-lg-2 col-md-4 offset-lg-1">
            <h5 className="title">About us</h5>
            <ul>
              <li>
                <a href="#!">Adress</a>
              </li>
              <li>
                <a href="#!">Team</a>
              </li>
              <li>
                <a href="#!">Phone number</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4">
            <h5 className="title">Metrics</h5>
            <ul>
              <li>
                <a href="#!">Shoe sizes</a>
              </li>
              <li>
                <a href="#!">T-shirt sizes</a>
              </li>
              <li>
                <a href="#!">Sweatshirt sizes</a>
              </li>
              <li>
                <a href="#!">Pants sizes</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-4">
            <h5 className="title">Useful links</h5>
            <ul>
              <li>
                <a href="#!">Pricing</a>
              </li>
              <li>
                <a href="#!">Delivery</a>
              </li>
              <li>
                <a href="#!">Countries</a>
              </li>
              <li>
                <a href="#!">Returns</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-copyright">© 2021 Copyright: Spike</div>
    </footer>
  )
}

export default Footer
