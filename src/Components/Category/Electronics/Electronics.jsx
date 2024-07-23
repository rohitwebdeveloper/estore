import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
// import { FaHeart } from "react-icons/fa";
import Filter from '../FilterandProduct/Filter';
import './Electronics.css';
import Productlist from '../FilterandProduct/Productlist';

const Electronics = () => {

  const productlist = ['all', 'Mobiles', 'Laptops', 'Cameras']
  const electronicsbrand = ["Vivo", "Oppo", "Realme", 'Samsung', "Oneplus", 'Motorola', 'Xiaomi', "Dell", "HP", "Apple", 'Acer', 'Lenovo', 'Asus', "Canon", "Nikon", "Sony"]
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDataCopy, setcategoryDataCopy] = useState([]);
  const [categoryDataOriginal, setcategoryDataOriginal] = useState([]);
  const [range, setRange] = useState();


  useEffect(() => {
    ; (async () => {
      try {
        let category = "Electronics"
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

  const mobilesClick = () => {
    setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Mobiles"))
    setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Mobiles"))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const laptopsClick = () => {
    setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Laptops"))
    setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Laptops"))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const camerasClick = () => {
    setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Cameras"))
    setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Cameras"))
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


  // const addToWishlistClick = async () => {
  //   try {
  //     const wishlistResponse = await axios.post(`http://localhost:8000/products/category/${category}`)
  //     if(wishlistResponse.status==200 || wishlistResponse.data.success==true) {
  //       alert('Added to wishlist')
  //       return
  //     }
  //   } catch (error) {
  //     alert('Failed to add to wishlist due to Internal server error')
  //   }
  // }


  return (
    <>
      <div className="container">
        <Productlist click={[allclick, mobilesClick, laptopsClick, camerasClick]} productlistname={productlist} />
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
                    <button className='fashionwishlistBtn'  >Add To Wishlist</button>
                    <details>{currdata.description} </details>
                  </div>
                </div>
              )
            }))}
          </div>
        </div>
        <Filter change={handleonchange} brand={electronicsbrand} rangevalue={range} />
      </div>
    </>
  )
}



export default Electronics;