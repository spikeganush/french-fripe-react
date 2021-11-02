import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import carousel1 from '../img/RalphLaurenPoloTees-2_394x.jpg'
import carousel2 from '../img/FestivalCrazyPatternedShirts-2_394x.jpg'
import carousel3 from '../img/RalphLaurenShirts-2_394x.jpg'

export default () => (
  <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
    <div>
      <img alt="" src={carousel1} />
      <p className="legend">New collection</p>
    </div>
    <div>
      <img alt="" src={carousel2} />
      <p className="legend">10% Discount</p>
    </div>
    <div>
      <img alt="" src={carousel3} />
      <p className="legend">Only 3 left</p>
    </div>
  </Carousel>
)
