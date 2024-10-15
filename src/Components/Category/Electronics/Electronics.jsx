import React from 'react'
import apiurl from '../../../api/apiConfig';
import { useState, useEffect } from 'react';
import axios from "axios";
import Filter from '../FilterandProduct/Filter';
import './Electronics.css';
import Productlist from '../FilterandProduct/Productlist';
import CategoryAPIRequestHandler from '../../../api/CategoryAPIRequestHandler';
import Loader from '../../Loader/Loader';
import ProductGrid from '../ProductGrid/ProductGrid';

const Electronics = () => {
  const userid = sessionStorage.getItem('usertoken')
  const [loading, error, noData, data] = CategoryAPIRequestHandler("Electronics")
  const productlist = ['all', 'Mobiles', 'Laptops', 'Cameras']
  const electronicsbrand = ["Vivo", "Oppo", "Realme", 'Samsung', "Oneplus", 'Motorola', 'Xiaomi', "Dell", "HP", "Apple", 'Acer', 'Lenovo', 'Asus', "Canon", "Nikon", "Sony"]
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDataCopy, setcategoryDataCopy] = useState([]);
  const [range, setRange] = useState();
  const [wishlistAddresponse, setwishlistAddresponse] = useState('')

  useEffect(() => {
    if (!loading && !error && !noData && data) {
      setCategoryData(data)
      setcategoryDataCopy(data)
    }
  }, [data])


  // const allclick = () => {
  //   setCategoryData(data)
  //   setcategoryDataCopy(data)
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }


  // const mobilesClick = () => {
  //   setCategoryData(data.filter((data) => data.subCategory == "Mobiles"))
  //   setcategoryDataCopy(data.filter((data) => data.subCategory == "Mobiles"))
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }
  // const laptopsClick = () => {
  //   setCategoryData(data.filter((data) => data.subCategory == "Laptops"))
  //   setcategoryDataCopy(data.filter((data) => data.subCategory == "Laptops"))
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }
  // const camerasClick = () => {
  //   setCategoryData(data.filter((data) => data.subCategory == "Cameras"))
  //   setcategoryDataCopy(data.filter((data) => data.subCategory == "Cameras"))
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }

  const categoryDataFilter = (categories) => {
    const updatedData = categories == 'all' ? data : data.filter((item) => item.subCategory == categories)
    setCategoryData(updatedData)
    setcategoryDataCopy(updatedData)
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


  const addToWishlistClick = async (productid) => {
    if(!userid){
      alert('Please Sign-In , to add to wishlist !')
      return
    }
    try {
      const wishlistResponse = await axios.post(`${apiurl}/api/wishlist/${productid}`, { userid })
      if (wishlistResponse.status == 200 || wishlistResponse.data.success == true) {
        setwishlistAddresponse('Added To Wishlist !')
        setTimeout(() => {
          setwishlistAddresponse('')
        }, 3000);
        return
      }
    } catch (error) {
      alert('Failed to add to wishlist due to Internal server error',)
    }
  }


  return (
    <>
      <div className="container">
        <Productlist click={categoryDataFilter} productlistname={productlist} />
        {loading && (<h2 style={{ textAlign: 'center', marginTop: '15%', width:'100%' }} ><Loader /></h2>)}
        {error && (<h2 style={{ textAlign: 'center', marginTop: '15%', width:'100%' }} >Sorry, Something went wrong!</h2>)}
        {noData && (<h2 style={{ textAlign: 'center', marginTop: '15%', width:'100%' }} >No Items Found !</h2>)}
        {!loading && !error && !noData && (
          <ProductGrid productData={categoryData} wishlistClick={addToWishlistClick} wislistResponse={wishlistAddresponse} />
        )}
        <Filter change={handleonchange} brand={electronicsbrand} rangevalue={range} />
      </div>
    </>
  )
}


export default Electronics;