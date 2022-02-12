import React,{useEffect,useState} from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import axios from 'axios'
import FilterCars from './FilterCars'
import DisplayCars from './DisplayCars'
import Pagination from "react-js-pagination";
import {useLocation} from 'react-router-dom'
const CarApp = (props) => {
const [loading,setLoading]=useState(false)
const [allDataCars,setAlldataCars]=useState()
const [carsNames,setCarsNames]=useState()
const [allCarColor,setAllCarColor]=useState()
// const [single,setSingle]=useState()

useEffect(() => {
  setLoading(true);
  axios.get(`https://myfakeapi.com/api/cars/`).then((res) => {
    const cars = res.data.cars;
    setAlldataCars(cars);
    setLoading(false);
    const carNamesAll = cars.map((all) => {
      //car names
      return all.car;
    });
    const carNamesRemoveDuble = Array.from(new Set(carNamesAll));
    setCarsNames(carNamesRemoveDuble.sort());

    /**CAR COLOR ALL REMOVE DOUBLE**/
    const carAllColorFilter = cars.map((all) => {
      return all.car_color;
    });

    const carAllColorRemoveDuble = Array.from(new Set(carAllColorFilter));
    setAllCarColor(carAllColorRemoveDuble);
  });

}, []);






/************SELECT OPTION**********/

const [selectFilterCar,setSelectFilterCar]=useState({
  carName:"any",
  carModel:"",
  carColor:""
})
const selectFiltersChange=(e)=>{
  const name=e.target.name
  const value=e.target.value

setSelectFilterCar({...selectFilterCar,[name]:value})

}






/****************Search Button**************/
const [currentPage,setCurrentPage]=useState("")
const [displayCars,setDisplayCars]=useState()
const searchCar=(e)=>{
  e.preventDefault()

  // const c=displayCars&&displayCars.slice((pageNumber - 1) * 4, pageNumber * 4)
  // const c=allDataCars&&allDataCars.slice((pageNumber - 1) * 4, pageNumber * 4)
  // setCurrentPage(c)


const currentDisplayedName=allDataCars&&allDataCars.filter(all=>all.car===selectFilterCar.carName)//filter by CAR NAME
const currentDisplayedNameModel=currentDisplayedName.filter(all=>all.car_model===selectFilterCar.carModel)//filter by CAR NAME and MODEL
const currentDisplayedNameColor=currentDisplayedNameModel.filter(all=>all.car_color===selectFilterCar.carColor)



if(selectFilterCar.carName==='any'){
setDisplayCars(allDataCars)
setCurrentPage(allDataCars.slice((1 - 1) * 4, 1 * 4))
}


else if(selectFilterCar.carName &&  !selectFilterCar.carModel && !selectFilterCar.carColor){
  setDisplayCars(currentDisplayedName)
  setCurrentPage(currentDisplayedName.slice((1 - 1) * 4, 1 * 4))
}else if(selectFilterCar.carName && selectFilterCar.carModel && !selectFilterCar.carColor){
    setDisplayCars(currentDisplayedNameModel)
    setCurrentPage(currentDisplayedNameModel)
}else if(selectFilterCar.carName || selectFilterCar.carModel || selectFilterCar.carColor){

  setDisplayCars(currentDisplayedNameColor)

  setCurrentPage(currentDisplayedNameColor.slice((1 - 1) * 4, 1 * 4))
  }
else{
  setDisplayCars("Empty!")
}

const pageNumberLocalStorage=sessionStorage.setItem("pageNumber", JSON.stringify(1));
setActivePages(1)


const selectSetLocalStoradge=sessionStorage.setItem("selectCarOption", JSON.stringify(selectFilterCar));

/**SET CAR MODEL LOCAL STORAGE***/
const localStorageModels=currentDisplayedName&&currentDisplayedName.map((all)=>{
  return all.car_model
})
const carModelLocalStorage=sessionStorage.setItem("carModel", JSON.stringify(localStorageModels))

console.log(localStorageModels)
}





/**************SET LOCALSTORAGE DATA ON SEARCH CLICK**************/

useEffect(()=>{
  if(displayCars){
    const storadgeAllCars=sessionStorage.setItem("storageCurrentPage", JSON.stringify(displayCars));

  }

},[currentPage])


/************GET LOCALSTORAGE DATA FROM LOCAL STORAGE**********/
useEffect(()=>{
  const getStoradgeAllCars=JSON.parse(sessionStorage.getItem('storageCurrentPage'));
    const getStoradgepageNumber=JSON.parse(sessionStorage.getItem('pageNumber'));
    const getCarNameLocalStorage=JSON.parse(sessionStorage.getItem('selectCarOption'));

if(getStoradgeAllCars!=null){
  setSelectFilterCar(getCarNameLocalStorage)
  setCurrentPage(getStoradgeAllCars.slice((getStoradgepageNumber - 1) * 4, getStoradgepageNumber * 4))
  setDisplayCars(getStoradgeAllCars)

console.log(getStoradgeAllCars&&getStoradgeAllCars[0].car)

setActivePages(getStoradgepageNumber)
}else{
  setCurrentPage(currentPage)
}
},[])





/*********PAGNATION***********/
const [activePage,setActivePages]=useState(1)

const [pageNumber,setPageNumber]=useState(1)
const handlePageChange=(pageNumber)=> {
  const pageNumberLocalStorage=sessionStorage.setItem("pageNumber", JSON.stringify(pageNumber));

  console.log(`active page is ${pageNumber}`);
  setActivePages(pageNumberLocalStorage?pageNumberLocalStorage:pageNumber)
  const c=displayCars&&displayCars.slice((pageNumber - 1) * 4, pageNumber * 4)
console.log(c)
setCurrentPage(c)
}

  return (
<>
<div id="allContentCars">
<div className="container">

<FilterCars
  selectFilterCar={selectFilterCar}
  selectFiltersChange={selectFiltersChange}
  searchCar={searchCar}
  carsNames={carsNames}
  allDataCars={allDataCars}
  allCarColor={allCarColor}

/>


<section className="showCars">
<div className="row">


{currentPage&&currentPage.map((all)=>{
  return <DisplayCars {...all} key={all.id}/>
})}

{currentPage&&<Pagination
        activePage={activePage}
        itemsCountPerPage={4}
        totalItemsCount={displayCars&&displayCars.length}
        pageRangeDisplayed={4}
        onChange={handlePageChange}
        itemClass="pagnItem"
        prevPageText={<i class="fa-solid fa-angle-left"></i>}
        nextPageText={<i class="fa-solid fa-angle-right"></i>}
        firstPageText={<i class="fa-solid fa-angles-left"></i>}
        lastPageText={<i class="fa-solid fa-angles-right"></i>}
      />}


</div>


</section>


</div>
</div>
</>
  )
}

export default CarApp
