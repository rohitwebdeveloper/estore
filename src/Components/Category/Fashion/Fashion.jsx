import React from 'react'
import { useState } from 'react';
import Categorydata from '../../Imageurl/Categorydata';
import Filter from '../FilterandProduct/Filter';
import Productlist from '../FilterandProduct/Productlist';
import "./Fashion.css"

const Fashion = () => {
  const filtered_img = Categorydata.filter((data) => data.major_category == 'fashion');
  const productlist = ['all', 'shirts', 'trausors & jeans', 'sarees & suits', 'seasonal wears', 'accessories', 'shoes'];
  const fashionbrand = ['asos', 'fabindia', 'peterEngland', 'levis', 'pluss']
  const fashionprice = ['Upto ₹200', '₹200 to ₹500', '₹500 to ₹1000', '₹1500 to ₹2000', '₹2000 to ₹2500', '₹3000 to ₹3500', '₹3500 to ₹4000', '₹4000 to ₹5000', 'Above ₹5000 ']

  const [categoryimg, setcategoryimg] = useState(filtered_img);
  const [categoryimg_copy, setcategoryimg_copy] = useState(filtered_img);

  const allclick = () => {
    setcategoryimg(filtered_img)
    setcategoryimg_copy(filtered_img)
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const shirtsclick = () => {
    setcategoryimg(filtered_img.filter((data) => data.minor_category == 'shirts'))
    setcategoryimg_copy(filtered_img.filter((data) => data.minor_category == 'shirts'))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const trouserjeansclick = () => {
    setcategoryimg(filtered_img.filter((data) => data.minor_category == 'trouserjeans'))
    setcategoryimg_copy(filtered_img.filter((data) => data.minor_category == 'trouserjeans'))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const sareesuitclick = () => {
    setcategoryimg(filtered_img.filter((data) => data.minor_category == 'sareesuit'))
    setcategoryimg_copy(filtered_img.filter((data) => data.minor_category == 'sareesuit'))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const seasonalwearclick = () => {
    setcategoryimg(filtered_img.filter((data) => data.minor_category == 'seasonalwear'))
    setcategoryimg_copy(filtered_img.filter((data) => data.minor_category == 'seasonalwear'))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const accessoriesclick = () => {
    setcategoryimg(filtered_img.filter((data) => data.minor_category == 'accessories'))
    setcategoryimg_copy(filtered_img.filter((data) => data.minor_category == 'accessories'))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const shoesclick = () => {
    setcategoryimg(filtered_img.filter((data) => data.minor_category == 'shoes'))
    setcategoryimg_copy(filtered_img.filter((data) => data.minor_category == 'shoes'))
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
        <Productlist click={[allclick, shirtsclick, trouserjeansclick, sareesuitclick, seasonalwearclick, accessoriesclick, shoesclick]} productlistname={productlist} />
        <div className="product_section">
          <div className="row">
            {categoryimg.length === 0 ? (
              <h1>No Result</h1>
            ) : (categoryimg.map((currdata) => {
              return (
                <>
                  <div className="fashionproduct_card">
                    <div className="fashionproduct_img" key={currdata.id} >
                      <img src={currdata.url} alt="" />
                      {/* <h5>{currdata.category}</h5> */}
                    </div>
                    <div className="fashionproduct_detail">
                      <div className="fashionproduct_brand">
                        {currdata.brands}
                      </div>
                      <div className="fashionproduct_name">
                        {currdata.name}
                      </div>
                      <div className="fashion_rating">
                        {currdata.rating}
                      </div>
                      <div className="priceandkart">
                        <div className="fashion_price"> ₹{currdata.pricing}</div>
                      </div>
                        <button className='fashionkartBtn' >Add To Kart</button>
                    </div>

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

export default Fashion;