import React from 'react'
import { useState } from 'react';
import Categorydata from '../../Imageurl/Categorydata';
import Filter from '../FilterandProduct/Filter';
import Productlist from '../FilterandProduct/Productlist';
import './Appliance.css';

const Appliance = () => {

  const filtered_img = Categorydata.filter((data) => data.major_category == 'fashion');
  const productlist = ['all', 'tvs', 'refregirator', 'washing machine', 'fans & cooler', 'maicrowave & grinders'];
  const fashionbrand = ['samsung', 'lg', 'sony', 'usha', 'whirpool']
  const fashionprice = ['Upto ₹10000', '₹10000 to ₹15000', '₹15000 to ₹20000', '₹20000 to ₹25000', '₹25000 to ₹30000', '₹30000 to ₹40000', 'Above ₹40000 ']

  const [categoryimg, setcategoryimg] = useState(filtered_img);
  const [categoryimg_copy, setcategoryimg_copy] = useState(filtered_img);

  const allclick = () => {
    setcategoryimg(filtered_img)
    setcategoryimg_copy(filtered_img)
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const tvclick = () => {
    setcategoryimg(filtered_img.filter((data) => data.minor_category == 'shirts'))
    setcategoryimg_copy(filtered_img.filter((data) => data.minor_category == 'shirts'))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const refregiratorclick = () => {
    setcategoryimg(filtered_img.filter((data) => data.minor_category == 'trouserjeans'))
    setcategoryimg_copy(filtered_img.filter((data) => data.minor_category == 'trouserjeans'))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const washingmachineclick = () => {
    setcategoryimg(filtered_img.filter((data) => data.minor_category == 'sareesuit'))
    setcategoryimg_copy(filtered_img.filter((data) => data.minor_category == 'sareesuit'))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const fancoolerclick = () => {
    setcategoryimg(filtered_img.filter((data) => data.minor_category == 'seasonalwear'))
    setcategoryimg_copy(filtered_img.filter((data) => data.minor_category == 'seasonalwear'))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const maicrowavegrinderclick = () => {
    setcategoryimg(filtered_img.filter((data) => data.minor_category == 'accessories'))
    setcategoryimg_copy(filtered_img.filter((data) => data.minor_category == 'accessories'))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }

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
        <Productlist click={[allclick, tvclick, refregiratorclick, washingmachineclick, fancoolerclick, maicrowavegrinderclick]} productlistname={productlist} />
        <div className="dynamic_section">
          <div className="appliance_row">
            {categoryimg.length === 0 ? (
              <h1>No Result</h1>
            ) : (categoryimg.map((currdata) => {
              return (
                <>
                  <div className="appliance_product_card">
                    <div className="appliance_product_img" key={currdata.id} >
                      <img src={currdata.url} alt="" />
                      {/* <h5>{currdata.category}</h5> */}
                    </div>
                    <div className="appliance_product_detail">
                      <div className="appliance_product_name">
                        {currdata.name}
                      </div>
                      <div className="appliance_rating">
                        {currdata.rating}
                      </div>
                      <ul className="appliance_description">
                        <li>8GB & 128GB</li>
                        <li>50MP + 8MP + 8MP</li>
                        <li>5.8inch Amoled Display</li>
                        <li>6000mAh Li-ion Batteryy</li>
                        <li>8 Gen1 Processor</li>
                        <li>2 Year warranty from the manufacturer</li>
                      </ul>
                      <div className="appliance_price"> ₹{currdata.pricing}</div>
                      <button className='appliance_kartBtn' >Add To Kart</button>
                    </div>
                    {/* <div className="appliance_priceandkart">
                    </div> */}

                  </div>
                </>
              )
            }))}
          </div>
        </div>
        <Filter change={handleonchange} brand={fashionbrand} price={fashionprice} />
      </div>


    </>
  )
}

export default Appliance;