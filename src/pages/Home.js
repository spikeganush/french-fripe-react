import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import container from '../img/container.jpg'
import sweatshirt from '../img/pile_sweatshirt.jpg'
function Home() {
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="column_home">
            <h4 className="home_title">Welcome to French Fripe</h4>
            <Carousel
              autoPlay
              infiniteLoop
              interval={5000}
              enableTouch
              showThumbs={false}
              showStatus={false}
            >
              <div>
                <img
                  alt="product"
                  src={container}
                  className="image_carousel_home"
                />
                <p className="legend">New container every fortnight!</p>
              </div>
              <div>
                <img
                  alt="product"
                  src={sweatshirt}
                  className="image_carousel_home"
                />
                <p className="legend">Great choice of categories!</p>
              </div>
            </Carousel>
            <hr className="extra-margins" />
            <div className="row"></div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
