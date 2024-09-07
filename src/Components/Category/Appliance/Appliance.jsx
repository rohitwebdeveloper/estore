import React from 'react'
import { useState, useEffect } from 'react';
import Filter from '../FilterandProduct/Filter';
import Productlist from '../FilterandProduct/Productlist';
import CategoryAPIRequestHandler from '../../../api/CategoryAPIRequestHandler';
import ProductGrid from '../ProductGrid/ProductGrid';
import Loader from '../../Loader/Loader';
import axios from 'axios';
import './Appliance.css';

const Appliance = () => {
  const userid = sessionStorage.getItem('usertoken')
  const [loading, error, noData, data] = CategoryAPIRequestHandler("Appliances")
  const productlist = ['all', 'Refrigerators', 'Washing Machines', 'TVs', 'Microwaves']
  const appliancesbrand = [ "LG", "Samsung", "Whirlpool", "Bosch",  "Sony",  "Panasonic"]
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDataCopy, setcategoryDataCopy] = useState([]);
  const [range, setRange] = useState();
  const [wishlistAddresponse, setwishlistAddresponse] = useState('')

  // useEffect(() => {
  //   ; (async () => {
  //     try {
  //       let category = "Appliances"
  //       const response = await axios.get(`http://localhost:8000/products/category/${category}`)
  //       console.log(response)
  //       setCategoryData(response.data.electronicsProduct)
  //       setcategoryDataCopy(response.data.electronicsProduct)
  //       setcategoryDataOriginal(response.data.electronicsProduct)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   })()
  // }, [])



  // const allclick = () => {
  //   setCategoryData(categoryDataOriginal)
  //   setcategoryDataCopy(categoryDataOriginal)
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }

  // const refrigeratorClick = () => {
  //   setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Refrigerators"))
  //   setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Refrigerators"))
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }
  // const washingmachinesClick = () => {
  //   setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Washing Machines"))
  //   setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Washing Machines"))
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }
  // const tvsClick = () => {
  //   setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "TVs"))
  //   setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "TVs"))
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }
  // const microwavesClick = () => {
  //   setCategoryData(categoryDataOriginal.filter((data) => data.subCategory == "Microwaves"))
  //   setcategoryDataCopy(categoryDataOriginal.filter((data) => data.subCategory == "Microwaves"))
  //   document.querySelectorAll('.checkbox')
  //     .forEach((el) => el.checked = false);
  // }

  useEffect(() => {
    if (!loading && !error && !noData && data) {
      setCategoryData(data)
      setcategoryDataCopy(data)
    }
  }, [data])

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
    try {
      const wishlistResponse = await axios.post(`http://localhost:8000/wishlist/add/${productid}`, { userid })
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
        <Filter change={handleonchange} brand={appliancesbrand} rangevalue={range} />
      </div>
    </>
  )
}

export default Appliance;