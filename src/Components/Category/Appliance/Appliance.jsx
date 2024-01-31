import React from 'react'
import { useState } from 'react';
import Categorydata from '../../Imageurl/Categorydata';
import Filter from '../FilterandProduct/Filter';
import Productlist from '../FilterandProduct/Productlist';

const Appliance = () => {

  let filtered_img = Categorydata.filter((data) => data.major_category == 'appliance');

  const [categoryimg, setcategoryimg] = useState(filtered_img);
  const [categoryimg_copy, setcategoryimg_copy] = useState(filtered_img);

  const allonclick = ()=>{
    setcategoryimg(filtered_img)
    setcategoryimg_copy(filtered_img)
   document.querySelectorAll('.checkbox')
   .forEach((el)=>el.checked=false);
  }
  const tvonclick = ()=>{
    setcategoryimg(filtered_img.filter((data)=>data.minor_category == 'camera'))
    setcategoryimg_copy(filtered_img.filter((data)=>data.minor_category == 'camera'))
   document.querySelectorAll('.checkbox')
   .forEach((el)=>el.checked=false);
  }
  const refregiratoronclick = ()=>{
    setcategoryimg(filtered_img.filter((data)=>data.minor_category == 'ai'))
    setcategoryimg_copy(filtered_img.filter((data)=>data.minor_category == 'ai'))
    document.querySelectorAll('.checkbox')
    .forEach((el)=>el.checked=false);
  }
  const washingonclick = ()=>{
    setcategoryimg(filtered_img.filter((data)=>data.minor_category == 'earphone'))
    setcategoryimg_copy(filtered_img.filter((data)=>data.minor_category == 'earphone'))
    document.querySelectorAll('.checkbox')
    .forEach((el)=>el.checked=false);
  }

  const handleonchange = (event)=>{
    event.target.value;
    let checkboxval = [...document.querySelectorAll('.checkbox')]
    .filter((data)=> data.checked)
    .map((currdata)=> currdata.value) 
    console.log(checkboxval);

    let checkbox_filtered = categoryimg.filter((filterdata)=> filterdata.brand || filterdata.price || filterdata.rating)
    if (checkboxval.length===0) {
      setcategoryimg(categoryimg_copy)
    } else {
      setcategoryimg(checkbox_filtered)
    }
  }

  return (
    <>
      <div className="container">
        <Productlist click={[allonclick, tvonclick, refregiratoronclick, washingonclick]} productlistname={['TVs', 'Refregirator', 'WashingMachine', 'Fans & Cooler', 'ACs', 'Microwave', 'Invertor']} />
        <div className="dynamic_section">
          <div className="row">
            {categoryimg.map((currdata) => {
              return (
                <>
                  <div className="img_card" key={currdata.value} >
                    <img src={currdata.url} alt="" />
                    <h5>{currdata.category}</h5>
                  </div>
                </>
              )
            })}
          </div>
        </div>
        <Filter change={handleonchange} brand={['Samsung', 'Xiaomi', 'Sony', 'LG', 'TCL']}  price={['Upto ₹1000', '₹1000 to ₹2000', '₹2000 to ₹3000', '₹3000 to ₹5000', '₹5000 to ₹8000', '₹8000 to ₹11000', '₹11000 to ₹15000', '₹15000 to ₹20000', '₹20000 to ₹30000', 'Above ₹30000']} />
      </div>


    </>
  )
}

export default Appliance;