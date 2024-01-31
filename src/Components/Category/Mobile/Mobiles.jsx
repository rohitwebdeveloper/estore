import React from 'react'
import { useState } from 'react';
import Categorydata from '../../Imageurl/Categorydata';
import Filter from '../FilterandProduct/Filter';
// import Productlist from '../FilterandProduct/Productlist';

const Mobiles = () => {
  const filtered_img = Categorydata.filter((data) => data.major_category == 'mobiles');
  const mobilebrand = ['samsung', 'vivo', 'realme', 'oneplus', 'oppo']
  const mobileprice = ['Upto ₹7000', '₹7000 to ₹10000', '₹10000 to ₹12000', '₹12000 to ₹15000', '₹15000 to ₹20000', '₹20000 to ₹25000', '₹25000 to ₹30000', '₹30000 to ₹40000', '₹40000 to ₹50000', ' Above ₹50000']

  const [categoryimg, setcategoryimg] = useState(filtered_img);
  const [categoryimg_copy, setcategoryimg_copy] = useState(filtered_img);
  // const [categoryimg_secondcopy, setcategoryimg_secondcopy] = useState(filtered_img)

  // const allonclick = () => {
  //   setcategoryimg(filtered_img)
  //   setcategoryimg_copy(filtered_img)
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }
  // const tvonclick = () => {
  //   setcategoryimg(filtered_img.filter((data) => data.minor_category == 'camera'))
  //   setcategoryimg_copy(filtered_img.filter((data) => data.minor_category == 'camera'))
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }
  // const refregiratoronclick = () => {
  //   setcategoryimg(filtered_img.filter((data) => data.minor_category === 'ai'))
  //   setcategoryimg_copy(filtered_img.filter((data) => data.minor_category === 'ai'))
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }
  // const washingonclick = () => {
  //   setcategoryimg(filtered_img.filter((data) => data.minor_category === 'earphone'))
  //   setcategoryimg_copy(filtered_img.filter((data) => data.minor_category === 'earphone'))


  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }

  const handleonchange = (event) => { 
    event.target.value;
    let checkboxbrandval = [...document.querySelectorAll('.checkboxbrand')]
      .filter((data) => data.checked)
      .map((currdata) => currdata.value)
    console.log(checkboxbrandval);

    let checkboxpriceval = [...document.querySelectorAll('.checkboxprice')]
      .filter((data) => data.checked)
      .map((currdata) => currdata.value)
    console.log(checkboxpriceval);
     
    // let brand_checkbox = checkboxbrandval.length 
    // let price_checkbox = checkboxpriceval.length 

    let brandprice_filtered = categoryimg_copy.filter((filterdata) => checkboxbrandval.includes(filterdata.brands) && (checkboxpriceval.includes(filterdata.pricerange)))   
    let brand_filtered = categoryimg_copy.filter((filterdata) => checkboxbrandval.includes(filterdata.brands))   
    let price_filtered = categoryimg_copy.filter((filterdata) => checkboxpriceval.includes(filterdata.pricerange))  
 
     if ((checkboxbrandval.length!==0) && (checkboxpriceval.length!==0)) {
       setcategoryimg(brandprice_filtered) 
     } else if ((checkboxbrandval.length!==0) && (checkboxpriceval.length===0)) {
       setcategoryimg(brand_filtered)
     } else if ((checkboxpriceval.length!==0) && (checkboxbrandval.length===0)) {
       setcategoryimg(price_filtered)
     }  else {
      setcategoryimg(filtered_img)
     }



    // let checkboxbrand_filtered = categoryimg_copy.filter((filterdata) => checkboxbrandval.includes(filterdata.brands) && (checkboxpriceval.includes(filterdata.pricerange)))
    // setcategoryimg_secondcopy(checkboxbrand_filtered)
    
    // const checkboxprice_filtered = categoryimg_secondcopy.filter((filterdata) => checkboxpriceval.includes(filterdata.pricerange))



  //   if ((checkboxbrandval.length === 0) && (checkboxpriceval.length === 0)) {
  //     setcategoryimg(categoryimg_copy)
  //   }
  //   else if (checkboxbrand_filtered.length !== 0 && checkboxpriceval.length === 0) {
  //     setcategoryimg(categoryimg_copy.filter((filterdata) => checkboxbrandval.includes(filterdata.brands)))
  //   }
  //   else if (checkboxbrand_filtered.length !== 0 && checkboxprice_filtered.length === 0) {
  //     setcategoryimg(categoryimg_copy.filter((filterdata) => checkboxbrandval.includes(filterdata.pricerange)))
  //   }
  //   else if (checkboxbrandval.length === 0 && checkboxpriceval.length !== 0) {
  //     setcategoryimg(filtered_img.filter((filterdata) => checkboxpriceval.includes(filterdata.pricerange)))
  //   }
  //   else if (checkboxpriceval.length !== 0 && checkboxbrand_filtered.length !== 0) {
  //     setcategoryimg(checkboxbrand_filtered.filter((filterdata) => checkboxpriceval.includes(filterdata.pricerange)))
  //   }
  //   else if (checkboxbrand_filtered.length !== 0 && checkboxprice_filtered.length !== 0) {
  //     setcategoryimg(checkboxbrand_filtered.filter((filterdata) => checkboxpriceval.includes(filterdata.pricerange)))
  //   }
  //   // else if (checkboxbrand_filtered.length === 0) {
  //   //   setcategoryimg(categorimg_copy)
  //   // }
  //   else {
  //     setcategoryimg(categorimg_copy)
  //   }
  // }

  // change categoryimg to categoryimg_copy in all categories such as beauty fashion electronic etc
  }


  return (
    <>
      <div className="container">
        <div className="dynamic_section">
          <div className="row">
            { categoryimg.length===0 ? (
             <h1>No Result</h1>
            ) : (categoryimg.map((currdata) => {
              return (
                <>
                  <div className="product_card">
                    <div className="product_img" key={currdata.id} >
                      <img src={currdata.url} alt="" />
                      {/* <h5>{currdata.category}</h5> */}
                    </div>
                    <div className="product_detail">
                      <div className="product_name">
                        Realme Nazor R10
                      </div>
                      <div className="rating">
                        4.5
                      </div>
                      <ul className="description">
                        <li>8GB & 128GB</li>
                        <li>50MP + 8MP + 8MP</li>
                        <li>5.8inch Amoled Display</li>
                        <li>6000mAh Li-ion Batteryy</li>
                        <li>8 Gen1 Processor</li>
                        <li>2 Year warranty from the manufacturer</li>
                      </ul>
                    </div>
                    <div className="priceandkart">
                      <div className="price"> ₹{currdata.pricing}</div>
                      <button className='kart_btn' >Add To Kart</button>
                    </div>
                  </div>
                </>
              )
            }))}
          </div>
        </div>
        <Filter change={handleonchange} brand={mobilebrand} price={mobileprice} />
      </div>


    </>
  )
}

export default Mobiles;