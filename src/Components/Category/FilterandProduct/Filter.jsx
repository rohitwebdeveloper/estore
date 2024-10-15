import React, {useState, useEffect} from 'react'
import { FaStar } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";

const Filter = (props) => {


  // const branddata = props.brand;
  const [checkboxData, setcheckboxData] = useState(props.brand || [])
  const [isActive, setisActive] = useState(false)
  
  // const pricedata = props.price;

  useEffect(() => {
   setcheckboxData(props.brand)
  }, [])


  const filterSearchClick = () => {
    if (window.innerWidth <= 800) {
      setisActive(!isActive);
      return;
    }
  };

  return (
    <>
      <div className="filter_box">
        <h3 className="filter_heading"onClick={filterSearchClick}>Apply Filter <FaFilter/> </h3>
        <div className={`filter ${isActive ? 'active' : ''} `} >
          <h4>Brands</h4>
          {checkboxData.map((currdata, index) => {
            return (
              <div className="filter_items"  key={index} ><input type="checkbox" onChange={props.change} className="checkboxbrand checkbox" value={currdata ? currdata : ""} /> {currdata}</div>
            )
          })}

          <h4>Price</h4>
          <div className="filter_items"><input type="range" min="0" max="80000" onChange={props.change} className="pricerangeSlider" value={props.rangevalue || ""} /></div>
          <div className="priceBox">Upto: ₹{props.rangevalue}</div>

          <h4>Rating</h4>
          <div className="filter_items"><input type="checkbox" onChange={props.change} className="checkboxrating checkbox" value="5" /> 5 <FaStar /></div>
          <div className="filter_items"><input type="checkbox" onChange={props.change} className="checkboxrating checkbox" value="4" /> 4 <FaStar /> </div>
          <div className="filter_items"><input type="checkbox" onChange={props.change} className="checkboxrating checkbox" value="3" /> 3 <FaStar /></div>
          <div className="filter_items"><input type="checkbox" onChange={props.change} className="checkboxrating checkbox" value="2" /> 2 <FaStar /></div>
          <div className="filter_items"><input type="checkbox" onChange={props.change} className="checkboxrating checkbox" value="1" /> 1 <FaStar /></div>
        </div>
      </div>
    </>
  )
}

export default Filter;