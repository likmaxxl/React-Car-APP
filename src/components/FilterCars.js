import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'

const FilterCars = ({selectFiltersChange,selectFilterCar,carsNames,allDataCars,searchCar,allCarColor}) => {

const [carModelUnique,setCarModelUnique]=useState([])
const [carColorUnique,setCarColorUnique]=useState()

useEffect(()=>{
  const filterModel=allDataCars&&allDataCars.filter(all=>all.car===selectFilterCar.carName).map((all)=>{
    return all
  })

/**CAR MODEL REMOVE DOUBLE**/
const carModelFilter=filterModel&&filterModel.map((all)=>{
  return all.car_model
})
const carModelRemoveDuble = Array.from(new Set(carModelFilter));
setCarModelUnique(carModelRemoveDuble)


      /***CAR MODEL LOCAL STORAGE**/
const carModelLocalStorageGet=JSON.parse(sessionStorage.getItem('carModel'));

if(carModelRemoveDuble.length<=0){
  setCarModelUnique(carModelLocalStorageGet)
}




/********CAR COLOR REMOVE DOUBLE*******/
const carColorFilter=allDataCars&&allDataCars.filter(all=>all.car===selectFilterCar.carName)

const removeColorDuobleMap=carColorFilter&&carColorFilter.map((all)=>{
  return all.car_color
})
  const carColorRemoveDuble = Array.from(new Set(removeColorDuobleMap));
setCarColorUnique(carColorRemoveDuble)
selectFilterCar.carModel=""
selectFilterCar.carColor=""
},[selectFilterCar.carName])



useEffect(()=>{
  selectFilterCar.carColor=""
},[selectFilterCar.carModel])

  return (
  <>
<section className="selectCar">
    <form action="">
      <div className="select">
    <div className="label">Make</div>
  <select className="form-select"  id="" name="carName" value={selectFilterCar.carName} onChange={selectFiltersChange}>
      <option value="any">Any</option>
    {
      carsNames&&carsNames.map((all,index)=>{
        return <option key={index} value={all}>{all}</option>
      })
    }
      </select>
      </div>
        <div className="select">
    <div className="label">  Model</div>
      <select disabled={!selectFilterCar.carName || selectFilterCar.carName==="any"} style={{cursor:selectFilterCar.carName=="any"?"not-allowed":"" }} class="form-select" name="" id="" name="carModel" value={selectFilterCar.carModel} onChange={selectFiltersChange}>
        <option value="">Any</option>
      {
        carModelUnique&&carModelUnique.map((all,index)=>{
          return  <option key={index} value={all}>{all}</option>
        })
      }
      </select>
    </div>
      <div className="select">
        <div className="label">  Color</div>
      <select style={{cursor:selectFilterCar.carName==='any' || !selectFilterCar.carModel ?"not-allowed":"" }} disabled={selectFilterCar.carName==="any" || !selectFilterCar.carModel} class="form-select"  name="carColor" value={selectFilterCar.carColor} onChange={selectFiltersChange}>
        <option value="">Any</option>
      {
        allDataCars&&allDataCars.filter(all=>all.car_model===selectFilterCar.carModel).map((all,index)=>{
          return   <option  key={index} value={all.car_color}>{all.car_color}</option>
        })
      }

      </select>
    </div>
<button className="buttonSearch" onClick={searchCar}>Search</button>
    </form>
    </section>
  </>
  )
}

export default FilterCars
