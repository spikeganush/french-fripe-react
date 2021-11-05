import React from 'react'
import CarouselTrend from '../components/CarouselTrend'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import MenuLeft from '../components/MenuLeft'

import carrousel1 from '../img/RalphLaurenPoloTees-2_394x.jpg'
import carrousel2 from '../img/FestivalCrazyPatternedShirts-2_394x.jpg'

function Shop() {
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
            <div className="whatsnew">
              <div className="divider-new">
                <h2 className="h2-responsive">What's new?</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <CarouselTrend />
              </div>
            </div>

            <hr className="extra-margins" />

            <div className="row double">
              <div className="col-lg-4">
                <div className="card">
                  <div className="front">
                    <div className="card__photo">
                      <img src={carrousel1} className="../img-fluid" alt="" />
                    </div>

                    <div className="card-block">
                      <h4 className="card-title">Sweater</h4>

                      <p>Jumper sweater pull...</p>
                    </div>
                  </div>
                  <div className="back">
                    <h4 className="card-title">
                      Sweater <strong>$30</strong>
                    </h4>

                    <div className="card-text">
                      <p>Bags of 25Kg, top quality, from France.</p>
                      <p>
                        You can expect items such as jackets, coats, fleece,
                        tees, shirts, denim, trousers, shorts & jumpers
                      </p>
                    </div>
                    <div className="button">
                      <a href="product.php" className="btn btn-default">
                        More info
                      </a>
                    </div>
                  </div>
                  <div className="background"></div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card">
                  <div className="front">
                    <div className="card__photo">
                      <img
                        src={carrousel2}
                        className="../img-fluid"
                        alt="clothes"
                      />
                    </div>

                    <div className="card-block">
                      <h4 className="card-title">Harley Davidson Tee</h4>

                      <p>Summer is here</p>
                    </div>
                  </div>
                  <div className="back">
                    <h4 className="card-title">
                      Harley Davidson Tee <strong>$30</strong>
                    </h4>

                    <div className="card-text">
                      <p>Bags of 25Kg, top quality, from France.</p>

                      <p>
                        You can expect items such as jackets, coats, fleece,
                        tees, shirts, denim, trousers, shorts & jumpers
                      </p>
                    </div>
                    <div className="button">
                      <a href="product.php" className="btn btn-default">
                        More info
                      </a>
                    </div>
                  </div>
                  <div className="background"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Shop
