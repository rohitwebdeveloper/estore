import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from '../FilterandProduct/Filter';
import Productlist from '../FilterandProduct/Productlist';
import "./Fashion.css"

const Fashion = () => {
  const productlist = ['all', "Men's Clothing", "Women's Clothing", "Footwear"];
  const fashionclothbrand = ["Levis", "Nike", "Adidas", "Zara", "H&M", "Forever 21", "Puma", "Reebok", "Sketchers"]
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDataCopy, setcategoryDataCopy] = useState([]);
  const [categoryDataOriginal, setcategoryDataOriginal] = useState([]);
  const [range, setRange] = useState();


  useEffect(() => {
    ; (async () => {
      try {
        let category = "Fashion and Clothes"
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

  const mensClothClick = () => {
    setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Men's Clothing"))
    setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Men's Clothing"))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const womensClothClick = () => {
    setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Women's Clothing"))
    setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Women's Clothing"))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }
  const footwearClick = () => {
    setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Footwear"))
    setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Footwear"))
    document.querySelectorAll('.checkbox')
      .forEach((el) => el.checked = false);
  }


  const handleonchange = (event) => {
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
        <Productlist click={[allclick, mensClothClick, womensClothClick, footwearClick]} productlistname={productlist} />
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
        <Filter change={handleonchange} brand={fashionclothbrand} rangevalue={range} />
      </div>
    </>
  )
}

export default Fashion;