import React from 'react'
import Fade from 'react-reveal/Fade'

import './Hours.css'

// Use CSS Grid to layout the text that will show the business hours of the company.

const Hours = () => {
  return (
    <Fade top>
      <section className="hoursWrapper" id="hours">
        <h1 className="hoursHeader">OPENING HOURS</h1>
        <div className="hoursInfoWrapper">
          <div className="hoursContainer">
            <h3 className="hours">
              <span>
                8<sup>am</sup> - 10<sup>pm</sup>
              </span>
            </h3>
            <h4>Mon - Fri</h4>
          </div>
          <div className="hoursContainer">
            <h3 className="hours">
              <span>
                9<sup>am</sup> - 11<sup>pm</sup>
              </span>
            </h3>
            <h4>Saturday</h4>
          </div>
          <div className="hoursContainer">
            <h3 className="hours">
              <span>
                9<sup>am</sup> - 12<sup>am</sup>
              </span>
            </h3>
            <h4>Sunday</h4>
          </div>
        </div>
      </section>
    </Fade>
  )
}

export default Hours
