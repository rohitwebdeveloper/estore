import React from 'react'
import { useState } from 'react';
import Categorydata from '../../Imageurl/Categorydata';
import Filter from '../FilterandProduct/Filter';
import Productlist from '../FilterandProduct/Productlist';

const Beauty = () => {
  
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
        <Productlist click={[allonclick, tvonclick, refregiratoronclick, washingonclick]} productlistname={['Moistoriser &Lotion', 'Sunscreen', 'Shampoo & Conditioner', 'Serums &Toner', 'Masks', 'Makeup', 'Oils']} />
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
        <Filter change={handleonchange}  brand={['MamaEarth', 'Lakme', 'Nayeka', 'Dermaco', 'Cetafil']}  price={['Upto ₹100', '₹100 to ₹200', '₹200 to ₹300', '₹300 to ₹400', '₹400 to ₹500', '₹500 to ₹600', '₹600 to ₹800', '₹800 to ₹1000', '₹1000 to ₹1200', 'Above ₹1200']} />
      </div>


    </>
  )
}

export default Beauty;