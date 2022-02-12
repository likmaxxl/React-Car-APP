import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'


const DisplayCars = ({availability,car,car_model,id,car_color}) => {


  return (
  <>
      <div className="coll col-md-6 col-lg-4 col-xl-3">
        <article>
          <div className="card">
        <div className="card-header">
{!availability?<span class="bg-danger text-light">Not available</span>:<span class="bg-info">Available</span>}
        </div>
        <div className="card-body">
          <h5 className="card-title">{car}</h5>
        <p className="card-text">{car_model}</p>
      <div className="colorCar" style={{background:car_color}}></div>
    <Link to={`singleCar/${id}`} className="detailsBtn">Details</Link>
        </div>
      </div>

        </article>
      </div>
  </>
  )
}

export default DisplayCars
