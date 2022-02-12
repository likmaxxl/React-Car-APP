import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios'
import Loading from './Loading'

const DisplaySingleCar = (props) => {
  const id=useParams()

  const [loading,setLoading]=useState(false)
  const [allData,setAllData]=useState()
  const [singleCar,setSingleCar]=useState()
  async function fetchData() {
  setLoading(true)
  const response = await axios.get('https://myfakeapi.com/api/cars/');
  setAllData(response.data.cars)
     setLoading(false)
     const filterSingleCar=response.data.cars.filter(all=>all.id===parseInt(id.id))
     setSingleCar(filterSingleCar)


}

useEffect(()=>{
fetchData()
},[])
  return (
<>
{
  loading ?<Loading/>: singleCar&&singleCar.map((all,index)=>{
    return <div className="singleCarPage" key={index}>
      <div className="container">
        <div className="row">
    <div className="coll col-lg-6">
        <article>
    <div className="card">
      <div className="cardAll">
      <div className="cardHead">
        <h1>{all.car}</h1>
      </div>
      <div className="avability">
        <p className={all.availability?"bg-info text-light":"bg-danger text-light"}>{all.availability?"available":"sold"}</p>
      </div>
      <div className="carBody">

      <div className="carInfo">
      <p><b>Car:</b> {all.car}</p>
      <p><b>Model:</b> {all.car_model}</p>
    <p><b>Year:</b> {all.car_model_year}</p>
    <p><b>Vin:</b> {all.car_vin}</p>
    <p><b>Price:</b> {all.price}</p>
    <Link to="/" className="backBtn">
    Back
    </Link>
      </div>
      <figure>
    <img src="../../images/carPictureSinglePage.png" alt="car" className="img-fluid"/>
      </figure>
      </div>
      </div>

    </div>
        </article>

        </div>
            </div>
      </div>
    </div>
  })
}


</>
  )
}

export default DisplaySingleCar
