import React from 'react'
import { useState } from 'react';
import Categorydata from '../../Imageurl/Categorydata';
import Filter from '../FilterandProduct/Filter';
// import Productlist from '../FilterandProduct/Productlist';

const Mobiles = () => {
  const filtered_img = Categorydata.filter((data) => data.major_category == 'mobiles');
  const mobilebrand = ['samsung', 'vivo', 'realme', 'oneplus', 'oppo']
  const mobileprice = ['Upto ₹7000', '₹7000 to ₹10000', '₹10000 to ₹12000', '₹12000 to ₹15000', '₹15000 to ₹20000', '₹20000 to ₹25000', '₹25000 to ₹30000', '₹30000 to ₹40000', '₹40000 to ₹50000', ' Above ₹50000']
  // const mobilerating = [5, 4, 3, 2, 1]

  const [categoryimg, setcategoryimg] = useState(filtered_img);
  const [categoryimg_copy, setcategoryimg_copy] = useState(filtered_img);


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

    let checkboxratingval = [...document.querySelectorAll('.checkboxrating')]
      .filter((data) => data.checked)
      .map((currdata) => currdata.value)
    console.log(checkboxratingval);



    // let brand_checkbox = checkboxbrandval.length 
    // let price_checkbox = checkboxpriceval.length 

    let brandpricerating_filtered = categoryimg_copy.filter((filterdata) => checkboxbrandval.includes(filterdata.brands) && (checkboxpriceval.includes(filterdata.pricerange)) && (checkboxratingval.includes(filterdata.rating)))
    let brandprice_filtered = categoryimg_copy.filter((filterdata) => checkboxbrandval.includes(filterdata.brands) && (checkboxpriceval.includes(filterdata.pricerange)))
    let brandrating_filtered = categoryimg_copy.filter((filterdata) => checkboxbrandval.includes(filterdata.brands) && (checkboxratingval.includes(filterdata.rating)))
    let ratingprice_filtered = categoryimg_copy.filter((filterdata) => checkboxratingval.includes(filterdata.rating) && (checkboxpriceval.includes(filterdata.pricerange)))
    let brand_filtered = categoryimg_copy.filter((filterdata) => checkboxbrandval.includes(filterdata.brands))
    let price_filtered = categoryimg_copy.filter((filterdata) => checkboxpriceval.includes(filterdata.pricerange))
    let rating_filtered = categoryimg_copy.filter((filterdata) => checkboxratingval.includes(filterdata.rating))

    if ((checkboxbrandval.length !== 0) && (checkboxpriceval.length !== 0) && (checkboxratingval.length !== 0)) {
      setcategoryimg(brandpricerating_filtered)
    } else if ((checkboxbrandval.length !== 0) && (checkboxpriceval.length !== 0) && (checkboxratingval.length === 0)) {
      setcategoryimg(brandprice_filtered)
    } else if ((checkboxbrandval.length !== 0) && (checkboxratingval.length !== 0) && (checkboxpriceval.length === 0)) {
      setcategoryimg(brandrating_filtered)
    } else if ((checkboxratingval.length !== 0) && (checkboxpriceval.length !== 0) && (checkboxbrandval.length === 0)) {
      setcategoryimg(ratingprice_filtered)
    }
    else if ((checkboxbrandval.length !== 0) && (checkboxpriceval.length === 0) && (checkboxratingval.length === 0)) {
      setcategoryimg(brand_filtered)
    }
    else if ((checkboxpriceval.length !== 0) && (checkboxbrandval.length === 0) && (checkboxratingval.length === 0)) {
      setcategoryimg(price_filtered)
    }
    else if ((checkboxratingval.length !== 0) && (checkboxbrandval.length === 0) && (checkboxpriceval.length === 0)) {
      setcategoryimg(rating_filtered)
    }
    else {
      setcategoryimg(filtered_img)
    }

  }


  return (
    <>
      <div className="container">
        <div className="dynamic_section">
          <div className="row">
            {categoryimg.length === 0 ? (
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
                        {currdata.name}
                      </div>
                      <div className="rating">
                        {currdata.rating}
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
        <Filter change={handleonchange} brand={mobilebrand} price={mobileprice}  />
      </div>
    </>
  )
}

export default Mobiles;