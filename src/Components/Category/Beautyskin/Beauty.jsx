import React from 'react'
import { useState, useEffect} from 'react';
import Filter from '../FilterandProduct/Filter';
import Productlist from '../FilterandProduct/Productlist';
import axios from 'axios';
import './Beauty.css'

const Beauty = () => {
  const productlist = ['all', 'Skincare', 'Haircare', 'Makeup']
  const beautySkinbrand = ["Neutrogena", "Olay", "Clinique", "Pantene", "Head & Shoulders", "Herbal Essences", "MAC", "L'Oreal", "Maybelline"]
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDataCopy, setcategoryDataCopy] = useState([]);
  const [categoryDataOriginal, setcategoryDataOriginal] = useState([]);
  const [range, setRange] = useState();


  useEffect(() => {
    ; (async () => {
      try {
        let category = "Beauty and Skin"
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

  const skincareClick = () => {
    setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Skincare"))
    setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Skincare"))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const haircareClick = () => {
    setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Haircare"))
    setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Haircare"))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const makeupClick = () => {
    setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Makeup"))
    setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Makeup"))
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
        <Productlist click={[allclick, skincareClick, haircareClick, makeupClick]} productlistname={productlist} />
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
        <Filter change={handleonchange} brand={beautySkinbrand} rangevalue={range} />
      </div>
    </>
  )
}

export default Beauty;