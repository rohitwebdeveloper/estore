import React from 'react'
import { useState, useEffect } from 'react';
import Filter from '../FilterandProduct/Filter';
import Productlist from '../FilterandProduct/Productlist';
import axios from 'axios';
import './Appliance.css';

const Appliance = () => {
  const productlist = ['all', 'Refrigerators', 'Washing Machines', 'TVs', 'Microwaves']
  const appliancesbrand = [ "LG", "Samsung", "Whirlpool", "Bosch",  "Sony",  "Panasonic"]
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDataCopy, setcategoryDataCopy] = useState([]);
  const [categoryDataOriginal, setcategoryDataOriginal] = useState([]);
  const [range, setRange] = useState();


  useEffect(() => {
    ; (async () => {
      try {
        let category = "Appliances"
        const response = await axios.get(`http://localhost:8000/products/category/${category}`)
        console.log(response)
        setCategoryData(response.data.electronicsProduct)
        setcategoryDataCopy(response.data.electronicsProduct)
        setcategoryDataOriginal(response.data.electronicsProduct)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])



  const allclick = () => {
    setCategoryData(categoryDataOriginal)
    setcategoryDataCopy(categoryDataOriginal)
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }

  const refrigeratorClick = () => {
    setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Refrigerators"))
    setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Refrigerators"))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const washingmachinesClick = () => {
    setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Washing Machines"))
    setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Washing Machines"))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const tvsClick = () => {
    setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "TVs"))
    setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "TVs"))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const microwavesClick = () => {
    setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Microwaves"))
    setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Microwaves"))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }



  const handleonchange = (event) => {
    event.target.value;
    const checkboxbrandval = [...document.querySelectorAll('.checkboxbrand')]
      .filter(data => data.checked)
      .map(currdata => currdata.value);

    const checkboxratingval = [...document.querySelectorAll('.checkboxrating')]
      .filter(data => data.checked)
      .map(currdata => currdata.value);

    const pricerange = document.querySelector('.pricerangeSlider').value;
    setRange(pricerange);

    const filteredData = (brandVal, priceVal, ratingVal) => {
      return categoryDataCopy.filter((filterdata) => {
        const brandMatch = brandVal.length === 0 || brandVal.includes(filterdata.brand);
        const priceMatch = priceVal === 0 || filterdata.price <= priceVal;
        const ratingMatch = ratingVal.length === 0 || ratingVal.includes(filterdata.rating);
        return brandMatch && priceMatch && ratingMatch
      })
    }
    const updatedCategoryData = filteredData(checkboxbrandval, pricerange, checkboxratingval)
    setCategoryData(updatedCategoryData)

  }


  return (
    <>
      <div className="container">
        <Productlist click={[allclick, refrigeratorClick, washingmachinesClick, tvsClick, microwavesClick]} productlistname={productlist} />
        <div className="product_section">
          <div className="row">
            {categoryData.length === 0 ? (
              <h1>No Result</h1>
            ) : (categoryData.map((currdata, index) => {
              return (
                <div className="fashionproduct_card" key={index}>
                  <div className="fashionproduct_img" key={currdata.id} >
                    <img src={currdata.url} alt="" />
                    {/* <h5>{currdata.category}</h5> */}
                  </div>
                  <div className="fashionproduct_detail">
                    <div className="fashionproduct_brand">
                      {currdata.brand}
                    </div>
                    <div className="fashionproduct_name">
                      {currdata.title}
                    </div>
                    <div className="fashion_rating">
                      0
                    </div>
                    <div className="priceandkart">
                      <div className="fashion_price"> ₹{currdata.price}</div>
                    </div>
                    <button className='fashionwishlistBtn' >Add To Wishlist</button>
                    <details>{currdata.description} </details>
                  </div>
                </div>
              )
            }))}
          </div>
        </div>
        <Filter change={handleonchange} brand={appliancesbrand} rangevalue={range} />
      </div>
    </>
  )
}

export default Appliance;